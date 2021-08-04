import Layout from '@components/Layout';
import React from 'react';
import CartList from '@components/cart/CartList';

export default function Cart() {
  return (
    <Layout title="Cart page">
      <CartList />
    </Layout>
  );
}
