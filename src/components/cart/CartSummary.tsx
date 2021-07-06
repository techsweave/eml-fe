import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import {
  Flex, Text, Heading, CircularProgress, Button,
} from '@chakra-ui/react';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import showError from '@libs/showError';
import { useSession } from 'next-auth/client';
import { FaShoppingBag } from 'react-icons/fa';

type IProduct = Models.Tables.IProduct;
type ICart = Models.Tables.ICart;
const initTotalPrice = [0, 0];
const initLoading = true;

const CartSummary = (props: { cart: Array<ICart> }) => {
  const [state, setState] = useState(initTotalPrice);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(initLoading);

  const session = useSession()[0];
  const { cart } = props;

  const getTotalPrice = async (): Promise<[number, number]> => {
    let products: Array<IProduct> = [];
    let scanResult: Models.IMultipleDataBody<IProduct> = {
      data: [],
      count: 0,
    };
    const ids: Array<string> = [];
    let total = 0;
    let totalNoDiscount = 0;

    cart.forEach((x) => {
      if (!x.isChanged) {
        ids.push(x.productId);
      }
    });

    if (ids.length === 0) {
      return [0, 0];
    }

    const filter: ConditionExpression = {
      type: 'Membership',
      subject: 'id',
      values: ids,
    };

    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );

    do {
      scanResult = await productService.scanAsync(
        50,
        scanResult?.lastEvaluatedKey?.id,
        undefined,
        undefined,
        filter,
      );
      products = products.concat(scanResult.count ? scanResult.data : scanResult as any);
    } while (scanResult?.lastEvaluatedKey);

    products.forEach((product) => {
      const cartItem = cart.find((x) => x.productId === product.id)!;
      let price = product.price ? product.price : 0;
      totalNoDiscount += price * cartItem.quantity;
      if (product?.discount) {
        price -= ((price / 100) * product.discount!);
      }
      total += price * cartItem.quantity;
    });

    return Promise.resolve([total, totalNoDiscount]);
  };

  useEffect(() => {
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!loading) return;
    if (error) return;

    getTotalPrice()
      .then((data) => {
        setState(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.error);
        setLoading(false);
      });
  }, [state, setState, error, setError, loading, setLoading]);

  if (loading) {
    return (
      <Flex
        justifyContent='center'
      >
        <CircularProgress
          isIndeterminate
          color='red.300'
        />
      </Flex>
    );
  }

  if (error) {
    showError(error);
  }

  const goToChechOut = async () => {
    // TODO
    alert("Magikarp used splash! But nothing appened!")
  }

  return (
    <Flex
      direction='column'
      width={['100%', '100%', '30%', '30%', '30%']}
      padding='1em'
    >
      <Text
        color='gray.500'
        fontSize='xl'
      >
        Total:
      </Text>
      <Heading
        as='h3'
      >
        {state[0]}
        €
      </Heading>
      <Text
        as='del'
        color='gray.500'
        fontSize='lg'
      >
        {state[1]}
        €
      </Text>
      <Text
        color='gray.500'
        fontSize='lg'
      >
        {(Math.round(
          100 * 100 * (
            (state[1] - state[0])
            / state[1]),
        ) / 100)
          .toString()
          .replace('.', ',')
          .concat(' % saved!')}
      </Text>
      <Button
        mt='3%'
        leftIcon={<FaShoppingBag />}
        variant='solid'
        backgroundColor='red.400'
        height='4em'
        color='white'
        _hover={{
          backgroundColor: 'red.500',
        }}
        onClick={goToChechOut}
      >
        <Text
          fontSize='xl'
          fontWeight='bold'
          color='white'
        >
          Checkout
        </Text>
      </Button>
    </Flex>
  );
};

export default CartSummary;