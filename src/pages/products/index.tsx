import Layout from '@components/Layout';
import ProductList from '@components/product/ProductList';
import { GetStaticProps } from 'next';
import LambdaCaller from '@libs/lambdaCaller';
import { Models } from 'utilities-techsweave';
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
  // let products: Models.Tables.IProduct[] = [];
  const caller = new LambdaCaller();
    // products = (await caller.scanProductAsync(25)).data;
  return {
    props: {
      record: products,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
 */
