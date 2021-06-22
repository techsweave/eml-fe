import Layout from '@components/Layout';
import React from 'react';
import Carousel from '@components/home/Carousel/Carousel';
import RecentProduct from '@components/home/RecentProduct';
import productMock from '@test/ProductMock';
import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Models, Services } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';

const indexPage = ({ record }) => (
  <Layout title="EmporioLambda">
    <Box w='95%'>
      <Carousel product={record} />
      <RecentProduct product={productMock} />
    </Box>
  </Layout>
);
export const getStaticProps: GetStaticProps = async () => {
  let products: Models.Tables.IProduct[] = [];
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);

  const filter: ConditionExpression = {
    type: 'NotEquals',
    subject: 'discount',
    object: '0',
  };
  try {
    products = (await caller.scanAsync(6, undefined, undefined, undefined, filter)).data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      record: products,
    },
    revalidate: 600,
  };
};
export default indexPage;
