import Layout from '@components/Layout';
import ProductList from '@components/ProductList';
import { GetServerSideProps } from 'next';
import { lambdaCaller } from '@libs/lambdaCaller';
import React from 'react';
import Product from '@models/product';

export default function productPage(record) {
  return (
    <Layout title="Product-page">
      <ProductList productList={record} />
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  let products: Product[] = [];
  try {
    products = (await lambdaCaller.scanProductAsync(25)).data;
  } catch (error) {
    // TODO: Implements error handling here
    // alert(error);
  }
  return {
    props: {
      record: products,
    }, // will be passed to the page component as props
  };
};
