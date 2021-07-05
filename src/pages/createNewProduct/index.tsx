import React from 'react';
import CreateNew from '@components/product/vendor/CreateNew';
import Layout from '@components/Layout';

export default function createNewProduct({ record }) {
  return (
    <Layout title="Create-new-product">
      <CreateNew />
    </Layout>
  );
}