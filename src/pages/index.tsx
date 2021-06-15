import Layout from '@components/Layout';
import React from 'react';
import Carousel from '@components/home/Carousel';
import RecentProduct from '@components/home/RecentProduct';
import productMock from '@test/ProductMock';
import { Box } from '@chakra-ui/react';

const indexPage = () => (
  <Layout title="EmporioLambda">
    <Box w='95%'>
      <Carousel product={productMock} />
      <RecentProduct />
    </Box>
  </Layout>
);

export default indexPage;
