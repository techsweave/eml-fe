import Layout from '@components/Layout';
import ProductList from '@components/product/ProductList';
import { GetStaticProps } from 'next';
import { Models, Services } from 'utilities-techsweave';
import React from 'react';
import { Stack } from '@chakra-ui/layout';
// import ProductMock from '@test/ProductMock';
import Filter from '@components/filter/Filter';

export default function productPage({ record }) {
  return (
    <Layout title="Product-page">
      <Stack w='95%' direction={['column', 'column', 'row']}>
        <Filter />
        <ProductList productList={record} />
      </Stack>
    </Layout>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  let products: Models.Tables.IProduct[] = [];
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);
  try {
    products = (await caller.scanAsync(25)).data;
  } catch (error) {
    alert(error);
  }
  return {
    props: {
      record: products,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
