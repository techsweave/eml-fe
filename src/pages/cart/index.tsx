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
        <Box align="center">
          <CartList product={record} />
          <Button onClick={handleClick} variant="outline" colorScheme="red">Checkout</Button>
        </Box>
      )}
    </Layout>
  );
}
export const getStaticProps: GetStaticProps = async (context) => {
  let cart: Models.Tables.ICart[] = [];
  let products: Models.Tables.IProduct[] = [];
  const callerCart = new Services.Carts(`${process.env.NEXT_PUBLIC_API_ID_CART}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, 'eyJraWQiOiJWSVA1Tk5QTm1HZHVNR244Tlo5OVBTM2JzWWNlSXpiRmx6STJYVEFuSkJnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNmJkZWNjZC1jM2NhLTRkNWUtYTg0Zi0yODBiMjMwYzI1NjAiLCJldmVudF9pZCI6ImUzZGFmYzkyLTQ2NTEtNDQ3NS1hNjgwLTYwYWQ4ZjFkMGU3YyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MjQwMjUwNTksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX2VjaUVVdnd6cCIsImV4cCI6MTYyNDAyODY1OSwiaWF0IjoxNjI0MDI1MDU5LCJ2ZXJzaW9uIjoyLCJqdGkiOiI2YThiMmM5MC0yZDYwLTRlNTUtYmViMC01N2VjNDlhNzBlMzgiLCJjbGllbnRfaWQiOiI3djA5ZGxkYTdyNXBqbmpjaXVsN2c4anJhaCIsInVzZXJuYW1lIjoidGVzdGN1c3RvbWVyIn0.6Y5P8V2CCY_ZPyHc2eUsqLGzMsA4vcUvdpqnHYI-FnpZAkwqQHsH5ShTJg2dI9mqPOzPtxlL_xP0Frp_HX9QkCiv2K7jJSZvPXKPH2hNLweIx0k5wbhWrSp1DadHEK20LoVOKqno2iJj8zIAxRxafG_wVOpm-C0_kvhQQa7u3sqboGx-wF_mrk_xBQxIQfwA8o6GQ7HzMy_sYjwZAO1PupvYUZgqqK_3XHVta83QyTL8W_tup_D1GYYmqlyu6UEfRwvv0UDjivX5hNr3A6u15sJAd_dpn-IXpOEfibD3wy4yqWtw6J6kPGV517qt1Z_ZWvTw_agCbSUIguvsblOK8w', 'eyJraWQiOiJiWENiOVF2cW9TWG1xaHBJanAyMHR6UkRBSDliT1dtZ200YjBQTDk0ekc0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoidm1wMTBld184eXduTE9rV3R5UVNZQSIsInN1YiI6ImQ2YmRlY2NkLWMzY2EtNGQ1ZS1hODRmLTI4MGIyMzBjMjU2MCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYWRkcmVzcyI6eyJmb3JtYXR0ZWQiOiJ2aWEgbHVpZ2kgMjUifSwiYmlydGhkYXRlIjoiMDJcLzEyXC8xOTI1IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfZWNpRVV2d3pwIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6InRlc3RjdXN0b21lciIsImF1ZCI6Ijd2MDlkbGRhN3I1cGpuamNpdWw3ZzhqcmFoIiwiZXZlbnRfaWQiOiJlM2RhZmM5Mi00NjUxLTQ0NzUtYTY4MC02MGFkOGYxZDBlN2MiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYyNDAyNTA1OSwibmFtZSI6IkN1c3RvbWVyIiwicGhvbmVfbnVtYmVyIjoiKzM5MzQ2MTIzNDU2NyIsImV4cCI6MTYyNDAyODY1OSwiaWF0IjoxNjI0MDI1MDU5LCJmYW1pbHlfbmFtZSI6IlJvc3NpIiwiZW1haWwiOiJwYXhpa2U5NTgwQGptcGFudC5jb20ifQ.mm-QzhRx-O49lJ6vfRc8mJN1-mESpsMrBXX2mOuVGQ5WTSVo5PINwI-j5UBfjwU6ogR2Vz9Hof2n7TtfAkSI23xlz6zBRszpUm9vYL9-yoqS783vGzBrawdbp7pJ3xdIdPDX-r5B-KCK5wq_MmoqAFjwnAZf8fkOaEhLzioNLUEurjB8Xb7m4fJpl8M_4kA_Z8y5sdHX_pGlt0sqa9fk0685G5keekst0kHHnR6n3g_TRzvoSqVwmCferAnbvDKRxKAY_Z1V-WfMY4R33d0PYwWpijk5HgBpJb23fvo7FK-KYy-L0ifXgjrKnTzWj70vZRMNuz80K5uhoZdYUj0FUg');
  const callerProducts = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  try {
    cart = (await callerCart.getAsync()).data;
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
  const mergedCartProducts = cart.map(((subject) => {
    const otherSubject = products.find((element) => element.id === subject.productId);
    return { ...subject, ...otherSubject };
  }));
  return {
    props: {
      record: mergedCartProducts,
    },
    revalidate: 600,
  };
};
