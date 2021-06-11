import Layout from '@components/Layout';
import ProductList from '@components/product/ProductList';
import { GetStaticProps } from 'next';
import LambdaCaller from '@libs/lambdaCaller';
import Product from '@models/product';
import React from 'react';
import { Stack } from '@chakra-ui/layout';
import ProductMock from '@test/ProductMock';
import Filter from '@components/filter/Filter';

export default function productPage({ record }) {
  return (
    <Layout title="Product-page">
      <Stack w='95%' direction={['column', 'column', 'row']}>
        <Filter />
        <ProductList productList={ProductMock} />
      </Stack>
    </Layout>
  );
}
/* export const getStaticProps: GetStaticProps = async () => {
  let products: Product[] = [];
  const caller = new LambdaCaller();
  try {
    products = (await caller.scanProductAsync(25)).data;
  } catch (error) {
    // TODO: Implements error handling here
    alert(error);
  }
  return {
    props: {
      record: products,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
}; */
