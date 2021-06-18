import Layout from '@components/Layout';
import React from 'react';
import Carousel from '@components/home/Carousel/Carousel';
import RecentProduct from '@components/home/RecentProduct';
import productMock from '@test/ProductMock';
import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Models, Services } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';

const indexPage = () => (
  <Layout title="EmporioLambda">
    <Box w='95%'>
      <Carousel product={productMock} />
      <RecentProduct product={productMock} />
    </Box>
  </Layout>
);
export const getStaticProps: GetStaticProps = async () => {
  let products: Models.Tables.IProduct[];
  const caller = new Services.Products(`${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`);

  const filter: ConditionExpression = {
    type: 'NotEquals',
    object: 0,
    subject: 'discount',
  };
  try {
    products = (await caller.scanAsync(6, undefined, undefined, undefined, filter)).data;
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      record: products,
    },
    revalidate: 600,
  };
};
export default indexPage;
