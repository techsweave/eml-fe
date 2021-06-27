/* eslint-disable @typescript-eslint/no-throw-literal */
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import {
  useToast, Flex,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';

type ICart = Models.Tables.ICart;

const init: Array<ICart> = [];

const CartList = () => {
  const [state, setState] = useState(init);
  const [error, setError] = useState<Error>();
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
    if (state.length > 0) return;
    if (error) return;

    fetchData()
      .then((data) => {
        setState(data);
        console.log(session);
      })
      .catch((err) => {
        setError(err.error);
      });
  }, [state, setState, error, setError]);

  return (
    <Flex border='1px'>
      <Flex border='1px' />
      <Flex border='1px' />
    </Flex>
  );
};

export default CartList;
