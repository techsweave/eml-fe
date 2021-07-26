import Layout from '@components/Layout';
import OrderList from '@components/order/OrderList';
import { Models, Services, AuthenticatedUser } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { Flex, Stack } from '@chakra-ui/layout';
import * as AWS from 'aws-sdk';
import { useSession } from 'next-auth/client';
import { CircularProgress, useToast } from '@chakra-ui/react';

export default function orderPage() {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });
  const toast = useToast();
  const session = useSession()[0];
  const [userState, setUserState] = useState<boolean>();
  const [state, setState] = useState<Array<Models.Tables.IOrder>>();
  const [isLoading, setLoading] = useState(true);

  async function isVendor(s, l) {
    if (!l) return userState;
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!);
  }

  async function scanOrders(s): Promise<any> {
    let ret : Models.IMultipleDataBody<Models.Tables.IOrder>;
    let orderList: Models.Tables.IOrder[] = [];
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    const caller = new Services.Orders(`${process.env.NEXT_PUBLIC_API_ID_ORDERS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, s?.accessToken as string, s?.idToken as string);
    if (await user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string)) {
      ret = await caller.scanAsync(25, undefined, undefined, undefined, undefined);
    } else {
      ret = await caller.scanAsync(25, undefined, undefined, undefined, {
        type: 'Equals',
        subject: 'userId',
        object: await user.getUserId(),
      });
    }
    orderList = orderList.concat(ret.count ? ret.data : ret as any);
    return orderList;
  }

  useEffect(() => {
    const s = session;
    const l = isLoading;
    if (!l) return;
    if (state !== undefined) return;
    if (s === undefined) return;
    isVendor(s, l).then(
      (data) => {
        setUserState(data);
      },
    ).catch((err) => {
      toast({
        title: err.error.name,
        description: err.error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      });
    });

    if (s) {
      scanOrders(s).then(
        (data) => {
          setState(data);
          setLoading(false);
        },
      ).catch((err) => console.log(err));
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
