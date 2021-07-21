import Layout from '@components/Layout';
import OrderList from '@components/order/OrderList';
import { Models, Services, AuthenticatedUser } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { Flex, Stack } from '@chakra-ui/layout';
import * as AWS from 'aws-sdk';
import { useSession } from 'next-auth/client';
import { CircularProgress } from '@chakra-ui/react';
import showError from '@libs/showError';

export default function orderPage() {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });

  const session = useSession()[0];
  const [userState, setUserState] = useState<boolean>();
  const [state, setState] = useState<Array<Models.Tables.IOrder>>();
  const [isLoading, setLoading] = useState(true);

  async function isVendor(s, l) {
    if (!l) return userState;
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!);
  }

  async function scanOrders(s, v, l): Promise<any> {
    if (!l) return;
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    const caller = new Services.Orders(`${process.env.NEXT_PUBLIC_API_ID_ORDERS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, s?.accessToken as string, s?.idToken as string);
    if (await user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string)) return (await caller.scanAsync(25, undefined, undefined, undefined, undefined)).data;
    return (await caller.scanAsync(25, undefined, undefined, undefined, {
      type: 'Equals',
      subject: 'userId',
      object: await user.getUserId(),
    })).data;
  }

  useEffect(() => {
    const s = session;
    const l = isLoading;
    if (state !== undefined) return;
    if (s === undefined) return;
    isVendor(s, l).then(
      (data) => {
        setUserState(data);
      },
    ).catch((err) => showError(err));
    const v = userState;

    if (s) {
      scanOrders(s, v, l).then(
        (data) => {
          setState(data);
          setLoading(false);
        },
      ).catch((err) => showError(err));
    }
  }, [session, state, setState, userState, setUserState, isLoading, setLoading]);

  if (!isLoading) {
    return (
      <Layout title="Order-page">
        <Stack w='95%' direction={['column', 'column', 'row']} justifyContent='center'>
          <OrderList orderList={state!} />
        </Stack>
      </Layout>
    );
  } return (
    <Flex justifyContent='center'>
      <CircularProgress
        isIndeterminate
        color='red.300'
        size='3em'
      />
    </Flex>
  );
}
