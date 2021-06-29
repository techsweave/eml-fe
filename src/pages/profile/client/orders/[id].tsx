import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import OrderDetail from '@components/profile/client/orders/OrderDetail';
import Layout from '@components/Layout';
import OrderMock, { getOrderById, getOrdersData } from '@test/OrderMock';
import OrderedProductsMock from '@test/OrderedProductsMock';
import { Models } from 'utilities-techsweave';

export default function OrderDetailPage(prop: { order: Models.Tables.IOrder }) {
  const { order } = prop;
  console.log(order);
  return (
    <Layout title={order.id}>
      <p>{order.date}</p>
      <OrderDetail products={order.products} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const caller = new LambdaCaller();
  const paths = getOrderById();
  /*  const id = (await caller.scanProductAsync(25)).data;
    paths = id.map((idPath) => ({ params: { id: idPath.id } })); */
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let order: Models.Tables.IOrder;
  // const caller = new LambdaCaller();
  // product = await caller.getProductAsync(context.params?.id as string);
  order = await getOrdersData(context.params?.id as string);
  console.log(order);
  return {
    props: {
      order,
    }, // will be passed to the page component as props
    revalidate: 600,
  };
};
