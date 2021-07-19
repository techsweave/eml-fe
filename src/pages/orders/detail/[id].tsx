import React from 'react';
import OrderDetail from '@components/order/OrderDetail';
import Layout from '@components/Layout';
import { Services } from 'utilities-techsweave';
import { getSession } from 'next-auth/client';

import { GetServerSideProps } from 'next';
import { VStack } from '@chakra-ui/react';
import showError from '@libs/showError';

export default function OrderDetailPage(prop) {
  const { order } = prop;
  return (
    <Layout title={order.id}>
      <VStack justifyContent='center'>
        <OrderDetail products={order.products} order={order} />
      </VStack>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const s = await getSession(context);
  let order;
  const caller = new Services.Orders(`${process.env.NEXT_PUBLIC_API_ID_ORDERS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, s?.accessToken as string, s?.idToken as string);
  try {
    order = await caller.getAsync(context.params?.id as string);
  } catch (error) {
    showError(error);
  }
  return {
    props: {
      order,
    },
  };
};
