import React, { useState, useEffect } from 'react';
import OrderDetail from '@components/order/OrderDetail';
import Layout from '@components/Layout';
import { Models, Services } from 'utilities-techsweave';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/react';

type IOrder = Models.Tables.IOrder;
const initLoading = true;
export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState<Error>();
  const [state, setState] = useState<IOrder>();
  const [loading, setLoading] = useState(initLoading);
  const session = useSession()[0];
  const fetchData = async (s): Promise<IOrder> => {
    const caller = new Services.Orders(
      `${process.env.NEXT_PUBLIC_API_ID_ORDERS}`,
      `${process.env.NEXT_PUBLIC_API_REGION}`,
      `${process.env.NEXT_PUBLIC_API_STAGE}`,
      s?.accessToken as string,
      s?.idToken as string,
    );
    return caller.getAsync(id as string);
  };
  useEffect(() => {
    const s = session;
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!loading) return;
    if (id) {
      fetchData(s)
        .then((data) => {
          setState(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.error);
          setLoading(false);
        });
    }
  }, [state, setState, error, setError, loading, setLoading]);
  if (!loading && state) {
    return (
      <Layout title={state.id}>
        <OrderDetail products={state.products} order={state} />
      </Layout>
    );
  }
  return (
    <Flex justifyContent='center'>
      <CircularProgress
        isIndeterminate
        color='red.300'
        size='3em'
      />
    </Flex>
  );
}
