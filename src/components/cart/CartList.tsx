/* eslint-disable @typescript-eslint/no-throw-literal */
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import {
  useToast, Flex, CircularProgress,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import NoItemInCart from '@components/cart/NoItemInCart';

type ICart = Models.Tables.ICart;

const init: Array<ICart> = [];
const initLoading = true;

const CartList = () => {
  const [error, setError] = useState<Error>();
  const [state, setState] = useState(init);
  const [loading, setLoading] = useState(initLoading);
  const session = useSession()[0];

  const toast = useToast();
  const showError = async () => {
    if (!error) return;
    toast({
      title: error.name,
      description: error.message,
      status: 'error',
      duration: 10000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const fetchData = async (): Promise<Array<ICart>> => {
    let fetchedData: Array<ICart> = [];

    const cartService = new Services.Carts(
      process.env.NEXT_PUBLIC_API_ID_CART!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );

    const fetch = await cartService.getAsync();
    fetchedData = fetchedData.concat(fetch.data);

    return Promise.resolve(fetchedData);
  };

  useEffect(() => {
    showError();

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

  if (loading) {
    return (
      <CircularProgress
        isIndeterminate
        color='red.300'
        width='5em'
        height='5em'
      />
    );
  }

  if (state.length === 0) {
    return (
      <NoItemInCart />
    );
  }
  return (
    <Flex />
  );
};

export default CartList;
