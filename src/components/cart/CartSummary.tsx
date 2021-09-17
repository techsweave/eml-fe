import { Models, Services } from 'utilities-techsweave';
import React from 'react';
import {
  Flex, Text, Heading, Button, useToast, Stack,
} from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js'
import showError from '@libs/showError';
import { useSession } from 'next-auth/client';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type ICart = Models.Tables.ICart;
type IProduct = Models.Tables.IProduct;
type ICategory = Models.Tables.ICategory;
type ICartItemDetail = ICart & Omit<IProduct, 'id'> & Omit<ICategory, 'id'>

const CartSummary = (props: { cart: Array<ICartItemDetail> }) => {
  const { cart } = props;
  console.log(cart);
  let totalNoDiscount = 0;
  let total = 0;
  let totalTaxes = 0;


  const session = useSession()[0];

  // For hook call
  const toast = useToast();

  const goToCheckOut = async () => {
    try {
      const stripe = await stripePromise;

      const cartService = new Services.Carts(
        process.env.NEXT_PUBLIC_API_ID_CART!,
        process.env.NEXT_PUBLIC_API_REGION!,
        process.env.NEXT_PUBLIC_API_STAGE!,
        session?.accessToken as string,
        session?.idToken as string,
      );

      const stripeSession = await cartService.goToCheckoutAsync(`${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`, `${process.env.NEXT_PUBLIC_SITE_URL}/cart`);
      console.log(stripeSession);

      // When the customer clicks on the button, redirect them to Checkout.
      await stripe?.redirectToCheckout({
        sessionId: stripeSession.id,

      })
    }
    catch (error) {
      toast({
        title: error.error.name,
        description: error.error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }

  cart.forEach((x) => {
    let price = x.price ? x.price : 0;
    totalNoDiscount += price * x.quantity;
    if (x?.discount) {
      price -= ((price / 100) * x.discount!);
    }
    total += price * x.quantity;
  });
  cart.forEach((x) => {
    let price = x.price ? x.price : 0;
    if (x?.discount) {
      price -= ((price / 100) * x.discount!);
    }
    totalTaxes += (price * (x.taxes! / 100)) * x.quantity;
  });

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
        {
          total.toFixed(2)
            .toString()
            .replace('.', ',')
        }
        €
      </Heading>
      <Text
        as='del'
        color='gray.500'
        fontSize='lg'
        hidden={total === totalNoDiscount ? true : false}
      >
        {
          totalNoDiscount.toFixed(2)
            .toString()
            .replace('.', ',')
        }
        €
      </Text>
      <Text
        color='gray.500'
        fontSize='lg'
        hidden={total === totalNoDiscount ? true : false}
      >
        {(Math.round(
          100 * 100 * (
            (totalNoDiscount - total)
            / totalNoDiscount),
        ) / 100)
          .toString()
          .replace('.', ',')
          .concat(' % saved!')}
      </Text>
      <Text>Taxes: {' '}{totalTaxes.toFixed(2)
        .replace('.', ',')}€</Text>
      {session ? <Button
        mt='3%'
        leftIcon={<FaShoppingBag />}
        variant='solid'
        backgroundColor='red.400'
        height='4em'
        color='white'
        _hover={{
          backgroundColor: 'red.500',
        }}
        onClick={goToCheckOut}
      >
        <Text
          fontSize='xl'
          fontWeight='bold'
          color='white'
        >
          Checkout
        </Text>
      </Button> : <Stack><Text>You're not signed-in.</Text><Text>Please sign-in to proced with checkout</Text></Stack>}
    </Flex>
  );
};

export default CartSummary;
