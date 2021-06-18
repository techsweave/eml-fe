import Layout from '@components/Layout';
import { loadStripe } from '@stripe/stripe-js';
import { GetStaticProps } from 'next';
import { useSession, getSession } from 'next-auth/client';
import LambdaCaller from '@libs/lambdaCaller';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { Models, Services } from 'utilities-techsweave';
import React from 'react';
import CartList from '@components/cart/CartList';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import CartMock from '@test/CartMock';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function Cart(prop: { record: Models.Tables.IProduct[] }) {
  const { record } = prop;
  const [session] = useSession();

  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const caller = new LambdaCaller();

    try {
      const stripeSession = await caller.goToCheckOutAsync(`${process.env.NEXT_PUBLIC_SITE_URL}`, `${process.env.NEXT_PUBLIC_SITE_URL}cart`);

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe?.redirectToCheckout({
        sessionId: stripeSession.id,
      });
    } catch (error) {
      /*  // TODO: Implement error handling here
      alert(error); */
      return null;
    }
  };
  return (
    <Layout title="Cart page">
      {!session && (
        <span>User not authenticated, please sign-in to access the cart</span>
      )}
      {session && (
        <Box align="center">
          <CartList cart={record} />
          <Button onClick={handleClick} variant="outline" colorScheme="red">Checkout</Button>
        </Box>
      )}
    </Layout>
  );
}
export const getStaticProps: GetStaticProps = async (context) => {
  let cart: Models.Tables.ICart[] = [];
  let products: Models.Tables.IProduct[] = [];
  const callerCart = new Services.Carts(`${process.env.NEXT_PUBLIC_API_ID_CART}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  const callerProducts = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  try {
    cart = (await callerCart.getAsync()).data;
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const filterId: string[] = [];

  cart.forEach((x) => filterId.push(x.productId));
  const filter: ConditionExpression = {
    type: 'Membership',
    subject: 'id',
    values: filterId,
  };
  try {
    products = (await callerProducts.scanAsync(25, undefined, undefined, undefined, filter)).data;
  } catch {
    return {
      notFound: true,
    };
  }

  /* cart.forEach((x) => { const y = x; y.product = products.find((t) => t.id === y.productId); });
  cart = cart.filter((x) => x.product); */

  return {
    props: {
      record: products,
    },
    revalidate: 600,
  };
};
