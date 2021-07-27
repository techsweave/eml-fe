import Layout from '@components/Layout';
import { useSession } from 'next-auth/client';
import React from 'react';
import CartList from '@components/cart/CartList';

export default function Cart() {
  const [session] = useSession();
  return (
    <Layout title="Cart page">
      {!session && (
        <span>User not authenticated, please sign-in to access the cart</span>
      )}
      {session && (
        <CartList />
      )}
    </Layout>
  );
}
