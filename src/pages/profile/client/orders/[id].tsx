import React, { useState, useEffect } from 'react';
import OrderDetail from '@components/profile/client/orders/OrderDetail';
import Layout from '@components/Layout';
import { Models, Services } from 'utilities-techsweave';
import { useSession } from 'next-auth/client';

type IOrder = Models.Tables.IOrder;
let init: IOrder;
const initLoading = true;
export default function OrderDetailPage(prop: { order: Models.Tables.IOrder }) {
  const { order } = prop;
  const [error, setError] = useState<Error>();
  const [state, setState] = useState(init);
  const [loading, setLoading] = useState(initLoading);
  const session = useSession()[0];
  const fetchData = async (): Promise<IOrder> => {
    let fetchedData: IOrder;
    const caller = new Services.Orders(
      `${process.env.NEXT_PUBLIC_API_ID_ORDERS}`,
      `${process.env.NEXT_PUBLIC_API_REGION}`,
      `${process.env.NEXT_PUBLIC_API_STAGE}`,
      session?.accessToken as string,
      session?.idToken as string,
    );
    fetchedData = await caller.getAsync(order.id);
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

  return (
    <Layout title={state.id}>
      <OrderDetail products={state.products} />
    </Layout>
  );
}
