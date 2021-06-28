import Layout from '@components/Layout';
// TODO import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/client';
import React from 'react';
import CartList from '@components/cart/CartList';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// TODO const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function Cart() {
  const [session] = useSession();
  const handleClick = async () => {
    // TODO
  };
  return (
    <Layout title="Cart page">
      {!session && (
        <span>User not authenticated, please sign-in to access the cart</span>
      )}
      {session && (
        <Box align="center">
          <CartList />
          {
          /* <Button onClick={handleClick} variant="outline" colorScheme="red">Checkout</Button> */}
        </Box>
      )}
    </Layout>
  );
}
