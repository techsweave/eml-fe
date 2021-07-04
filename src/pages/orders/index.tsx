import Layout from '@components/Layout';
import OrderList from '@components/order/OrderList';
import { GetStaticProps } from 'next';
import { Models, Services, AuthenticatedUser } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { Heading, Stack } from '@chakra-ui/layout';
// import ProductMock from '@test/ProductMock';
import Filter from '@components/filter/Filter';
import * as AWS from 'aws-sdk'
import { useSession } from 'next-auth/client';

export default function orderPage() {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS!
    }
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


  async function scanOrders(s, v, l) {
    if (!l) return;
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    const caller = new Services.Orders(`${process.env.NEXT_PUBLIC_API_ID_ORDERS}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, s?.accessToken as string, s?.idToken as string);
    if (await user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string))
      return (await caller.scanAsync(25, undefined, undefined, undefined, undefined)).data;
    else
      return (await caller.scanAsync(25, undefined, undefined, undefined, {
        type: 'Equals',
        subject: 'userId',
        object: await user.getUserId()
      })).data;
  }

  useEffect(() => {
    const s = session;
    const l = isLoading;
    if (state != undefined) return;
    if (s == undefined) return;
    isVendor(s, l).then(
      (data) => {
        setUserState(data);
      }
    ).catch((err) => console.log(err))
    const v = userState;

    if (s)
      scanOrders(s, v, l).then(
        (data) => {
          setState(data)
          setLoading(false);
        }
      ).catch((err) => console.log(err))
  }, [session, state, setState, userState, setUserState, isLoading, setLoading]);


  if (!isLoading) {
    return (
      <Layout title="Order-page">
        <Stack>
          <Stack hidden={!userState} w='95%' direction={['column', 'column', 'row']}>
            <OrderList orderList={state!} />
          </Stack>
          <Heading hidden={userState}>403 - Forbidden</Heading>
        </Stack>
      </Layout>
    );
  } else
    return (<h1></h1>)
}
