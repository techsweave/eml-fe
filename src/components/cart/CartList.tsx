/* eslint-disable @typescript-eslint/no-throw-literal */
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import {
  Flex, CircularProgress, Stack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import NoItemInCart from '@components/cart/NoItemInCart';
import showError from '@libs/showError';
import CartSummary from './CartSummary';
import CartItem from './CartItem';

type ICart = Models.Tables.ICart;
type IState = {
  loading: boolean,
  error?: Error,
  data: Array<ICart>,
};

const init: IState = {
  loading: true,
  data: [],
};

const CartList = () => {
  const [state, setState] = useState(init);
  const session = useSession()[0];

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
    fetchedData = fetchedData.concat(fetch.data ? fetch.data : fetch as any);

    return Promise.resolve(fetchedData);
  };

  useEffect(() => {
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!state.loading) return;
    if (state.error) return;

    fetchData()
      .then((data) => {
        setState({
          loading: false,
          data,
        });
      })
      .catch((err) => {
        setState({
          loading: false,
          error: err.error,
          data: [],
        });
      });
  }, [state, setState]);

  showError(state.error);

  if (state.loading) {
    return (
      <Flex
        justifyContent='center'
      >
        <CircularProgress
          isIndeterminate
          color='red.300'
          size='3em'
        />
      </Flex>
    );
  }

  // const setStateFunction = (oldState: IState, id: string) => {
  //   if (!state.data) return state;

  //   const newState: IState = {
  //     loading: false,
  //     data: oldState.data.slice(oldState.data.findIndex((x) => x.id === id)),
  //   };

  //   return newState;
  // };

  const updateState = async (id?: string): Promise<void> => {
    if (!id) {
      // reload and do nothing
      setState({
        loading: true,
        data: [],
      });
      return;
    }

    const cartService = new Services.Carts(
      process.env.NEXT_PUBLIC_API_ID_CART!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );

    try {
      await cartService.removeProductAsync(id);
      const res = await fetchData();
      setState({
        loading: false,
        data: res,
      });
    } catch (err) {
      setState({
        loading: false,
        error: err.error,
        data: [],
      });
    }
  };

  if (state.data.length === 0) {
    return (
      <NoItemInCart />
    );
  }

  return (
    <Flex
      direction={['column', 'column', 'row', 'row', 'row']}
      width={['100%', '100%', '80%', '60%', '60%']}
    >
      {/* Cart Item List */}
      <Stack
        direction='column'
        width={['100%', '100%', '70%', '70%', '70%']}
        padding='0.5em'
      >
        {state.data.map((c) => (
          <CartItem
            cartItem={c}
            updateState={updateState}
            key={c?.id}
          />
        ))}
      </Stack>
      {/* Cart Item List */}
      <CartSummary cart={state.data} />
    </Flex>
  );
};

export default CartList;
