import Layout from '@components/Layout';
import { loadStripe } from '@stripe/stripe-js';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/client';
import LambdaCaller from '@libs/lambdaCaller';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import CartItem from '@models/cart';
import Product from '@models/product';
import React from 'react';
import CartList from '@components/cart/CartList';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

export default function Cart(prop: { record: CartItem[] }) {
  const { record } = prop;
  const [session] = useSession();

  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const caller = new LambdaCaller();

    try {
      const stripeSession = await caller.goToCheckOutAsync('https://eml-fe.vercel.app', 'https://eml-fe.vercel.app/cart');

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe?.redirectToCheckout({
        sessionId: stripeSession.id,
      });
    } catch (error) {
      // TODO: Implement error handling here
      alert(error);
    }
  };
  return (
    <Layout title="Cart page">
      {!session && (
        <span>User not authenticated, please sign-in to access the cart</span>
      )}
      {session && (
        <div>
          <CartList cart={record} />
          <button className="goToCheckout" type="button" onClick={handleClick}>Checkout</button>
        </div>
      )}
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  let cart: CartItem[] = [];
  let products: Product[] = [];
  const caller = new LambdaCaller(await getSession(context));

  try {
    cart = (await caller.getCartAsync()).data;
  } catch (error) {
    // TODO: Implement error handling here
    alert(error);
  }

  const filterId: string[] = [];

  cart.forEach((x) => filterId.push(x.productId));

  const filter: ConditionExpression = {
    type: 'Membership',
    subject: 'id',
    values: filterId,
  };

  try {
    products = (await caller.scanProductAsync(25, undefined, undefined, undefined, filter)).data;
    cart.forEach((x) => { const y = x; y.product = products.find((t) => t.id === y.productId); });
    cart = cart.filter((x) => x.product);
  } catch (error) {
    // TODO: Implement error handling here
    alert(error);
  }

  return {
    props: {
      record: cart,
    },
  };
};
