import { Models, AuthenticatedUser } from 'utilities-techsweave';
import React, { useState, useEffect } from 'react';
import {
  Image, VStack, Link,
  NumberInput, NumberInputField,
  Text,
} from '@chakra-ui/react';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/client';
import AddToCart from '@components/product/AddToCart';

const ProductDetail = (prop: {
  product: Models.Tables.IProduct,
  category: Models.Tables.ICategory
}) => {
  const { product, category } = prop;
  const session = useSession()[0];
  const [userState, setState] = useState<boolean>();
  const [quantityState, setQuantityState] = useState(1);

  const handleChange = (e) => {
    setQuantityState(e.target.value);
  };

  async function isVendor(s) {
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!);
  }
  useEffect(() => {
    const s = session;
    if (userState !== undefined) return;
    if (!s) return;
    isVendor(s).then(
      (data) => {
        setState(data);
      },
    ).catch(
      (err) => {
        console.log(err.message);
      },
    );
  }, [userState, setState, session]);

  return (
    <Flex w="95%" direction={['column', 'column', 'row', 'row']} alignSelf="center">
      <Button as="a" href="/products" ml={['0', '0', '2,5', '2,5']} mb={['5', '5', '0', '0']} w="100px" mr={['0', '0', '20', '20']} leftIcon={<ArrowBackIcon />} bg='gray.100'>back</Button>
      <Image src={product.imageURL} fallbackSrc='/images/fallback.png' alt={product.title} w="500px" h="300px" borderRadius="15px" fit='scale-down' />
      <VStack flexBasis="50%" alignSelf="center">
        <Heading as="h2">
          {product.title}
        </Heading>
        <Text>
          {product.description}
        </Text>
      </VStack>
      <VStack ml={['0', '0', '10', '10']} alignSelf="center">
        <Text textAlign='center'>
          Price:
          {' '}
          {product.price.toFixed(2)}
          {' '}
          €
        </Text>
        <Text textAlign='center'>
          Taxes:
          {' '}
          { (product.price * (category.taxes / 100)).toFixed(2)}
          {' '}
          €
        </Text>
        <HStack>
          <Text>
            Quantity
          </Text>
          <NumberInput defaultValue={1} min={1} max={product.availabilityQta} w='20'>
            <NumberInputField name='quantity' id='quantity' value={quantityState} onChange={handleChange} />
          </NumberInput>
        </HStack>
        <Text>
          Max Qty:
          {' '}
          {product.availabilityQta}
        </Text>
        <AddToCart
          productId={product.id}
          quantity={quantityState}
        />
        {/* TODO */}
        <Link href='/'>
          <Button hidden={!userState ? true : undefined}>Edit product</Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default ProductDetail;
