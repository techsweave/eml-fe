import Layout from '@components/Layout';
import { loadStripe } from '@stripe/stripe-js';
import { GetStaticProps } from 'next';
import { useSession, getSession } from 'next-auth/client';
import LambdaCaller from '@libs/lambdaCaller';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { Models } from 'utilities-techsweave';
import React from 'react';
import CartList from '@components/cart/CartList';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import CartMock from '@test/CartMock';
import { getProductsArrayData } from '@test/ProductMock';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function Cart(prop: { record: Models.Tables.ICart[] }) {
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
          {/* <CartList cart={CartMock} /> */}
          <Button onClick={handleClick} variant="outline" colorScheme="red">Checkout</Button>
        </Box>
      )}
    </Layout>
  );
}
/* export const getStaticProps: GetStaticProps = async (context) => {
  const cart: Models.Tables.ICart[] = [];
  let products: Models.Tables.IProduct[] = [];
  const caller = new LambdaCaller(await getSession(context.params));
    // cart = (await caller.getCartAsync()).data;

  const filterId: string[] = [];

  CartMock.forEach((x) => filterId.push(x.productId));
  const filter: ConditionExpression = {
    type: 'Membership',
    subject: 'id',
    values: filterId,
  };

    // products = (await caller.scanProductAsync(25, undefined, undefined, undefined, filter)).data;
    products = getProductsArrayData(filterId);
    /* cart.forEach((x) => { const y = x; y.products = products.find((t) => t.id === y.productId); });
    cart = cart.filter((x) => x.products);

  return {
    props: {
      record: products,
    },
    revalidate: 600,
  };
};
 */
