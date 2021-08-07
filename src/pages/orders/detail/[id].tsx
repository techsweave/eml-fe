import React, { useEffect, useState } from 'react';
import OrderDetail from '@components/order/OrderDetail';
import Layout from '@components/Layout';
import { AuthenticatedUser, Services } from 'utilities-techsweave';
import { getSession, useSession } from 'next-auth/client';

import { GetServerSideProps } from 'next';
import { VStack } from '@chakra-ui/react';
import showError from '@libs/showError';

export default function OrderDetailPage(prop) {
  const { order } = prop;
  const session = useSession()[0];
  const [userState, setState] = useState<boolean>();
  async function isVendor(s) {
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!);
  }
  useEffect(() => {
    const s = session;
    if (userState !== undefined) return;
    if (!s) return;
    isVendor(s).then(
      (data) => {
        setState(data);
      },
    ).catch(
      (err) => {
        console.log(err.message);
      },
    );
  }, [userState, setState, session]);
  return (
    <Layout title={order.id}>
      <VStack justifyContent='center'>
        <OrderDetail products={order.products} order={order} vendor={userState as boolean} />
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
