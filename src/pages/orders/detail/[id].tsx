import React from 'react';
import OrderDetail from '@components/order/OrderDetail';
import Layout from '@components/Layout';
import { Services } from 'utilities-techsweave';
import { getSession } from 'next-auth/client';

import { GetServerSideProps } from 'next';

export default function OrderDetailPage(prop) {
  const { order } = prop;
  return (
    <Layout title={order.id}>
      <OrderDetail products={order.products} order={order} />
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const s = await getSession(context);
  const accessToken = s?.accessToken as string;
  const idToken = s?.idToken as string;
  console.log('accessToken', accessToken);
  console.log('idToken', idToken);
  const caller = new Services.Orders(
    `${process.env.NEXT_PUBLIC_API_ID_ORDERS}`,
    `${process.env.NEXT_PUBLIC_API_REGION}`,
    `${process.env.NEXT_PUBLIC_API_STAGE}`,
    accessToken,
    idToken,
  );
  const order = await caller.getAsync(context.params?.id as string);
  return {
    props: {
      order,
    },
  };
};
