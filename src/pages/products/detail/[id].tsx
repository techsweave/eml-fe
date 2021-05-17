import Product from '@models/product';
import ProductDetail from '@components/ProductDetail';
import Layout from '@components/Layout';
import { GetServerSideProps } from 'next';
import { lambdaCaller } from '@libs/lambdaCaller';
import React from 'react';

export default function productDetailPage(prop: { product: Product }) {
  return (
    <Layout title={prop.product.name}>
      <ProductDetail product={prop.product} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let product;
  try {
    product = await lambdaCaller.getProductAsync(context.params?.id as string);
  } catch (error) {
    // TODO: Implement error handling here
    // alert(error);
  }
  return {
    props: {
      product,
    }, // will be passed to the page component as props
  };
};
