import { useSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Stack, Flex } from '@chakra-ui/layout';
import Layout from '@components/Layout';
import NavigationDesktop from '@components/profile/client/NavigationDesktop';
import NavigationSmartphone from '@components/profile/client/NavigationSmartphone';
import OrdersContent from '@components/profile/client/OrdersContent';
import { Models, Services } from 'utilities-techsweave';

type IOrder = Models.Tables.IOrder;
const init: IOrder[] = [];
const initLoading = true;

export default function auth() {
  const [error, setError] = useState<Error>();
  const [state, setState] = useState(init);
  const [loading, setLoading] = useState(initLoading);
  const session = useSession()[0];
  const fetchData = async (): Promise<Array<IOrder>> => {
    let fetchedData: IOrder[] = [];
    const caller = new Services.Orders(
      `${process.env.NEXT_PUBLIC_API_ID_ORDERS}`,
      `${process.env.NEXT_PUBLIC_API_REGION}`,
      `${process.env.NEXT_PUBLIC_API_STAGE}`,
      session?.accessToken as string,
      session?.idToken as string,
    );
    fetchedData = (await caller.scanAsync(25)).data;
    return Promise.resolve(fetchedData);
  };
  useEffect(() => {
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!loading) return;
    if (error) return;

    fetchData()
      .then((data) => {
        setLoading(false);
        setState(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.error);
      });
  }, [state, setState, error, setError, loading, setLoading]);

  if (!session) {
    return (
      <Layout title="Profile page - EmporioLambda">
        <Box>User not authenticated</Box>
      </Layout>
    );
  }
  return (
    <Layout title="Profile page - EmporioLambda">
      <Stack direction={['column', 'column', 'row', 'row']}>
        <Flex as="nav" h="full" w={340} bg="gray.100" display={['none', 'none', 'inherit', 'inherit']}><NavigationDesktop /></Flex>
        <Flex as="nav" h="min-content" w="full" display={['flex', 'flex', 'none', 'none']} justify="center"><NavigationSmartphone /></Flex>
        <Flex as="main" h="full" w="full" justify="space-between"><OrdersContent ordersContent={state} /></Flex>
      </Stack>
    </Layout>
  );
}
