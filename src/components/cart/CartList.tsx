/* eslint-disable @typescript-eslint/no-throw-literal */
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import {
  Flex, Stack, CircularProgress,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import NoItemInCart from '@components/cart/NoItemInCart';
import showError from '@libs/showError';
import CartSummary from './CartSummary';
import CartItem from './CartItem';

type ICart = Models.Tables.ICart;
type IProduct = Models.Tables.IProduct;
type ICartItemDetail = ICart & Omit<IProduct, 'id'>;
type IState = {
  loading: boolean,
  error?: Error,
  data: Array<ICartItemDetail>
};

const init: IState = {
  loading: true,
  data: [],
};

const CartList = () => {
  const [state, setState] = useState(init);
  const session = useSession()[0];

  /**
   * Add error to the current state
   * @param oldState Old state
   * @param err Error to display
   * @returns New State
   */
  const setError = (oldState: IState, err: Error) => {
    const newState: IState = {
      loading: false,
      data: oldState.data,
      error: err,
    };
    return newState;
  };

  /**
   * Add quantity to an item in the current state
   * @param oldState Old state
   * @param id Id of the cart
   * @param val Quantity to add
   * @returns New State
   */
  const addQuantityToState = (oldState: IState, id: string, val: number) => {
    if (!state.data) return state;
    const temp = oldState;

    const index = oldState.data.findIndex((x) => x.id === id);
    temp.data[index].quantity += val;

    const newState: IState = {
      loading: false,
      data: temp.data,
    };
    return newState;
  };

  /**
   * Fetch user cart and product detail
   * @returns Array of ICartItemDetail
   */
  const fetchData = async (): Promise<Array<ICartItemDetail>> => {
    let fetchedCart: Array<ICart> = [];
    let fetchedProducts: Array<IProduct> = [];
    let scanResult: Models.IMultipleDataBody<IProduct> = {
      data: [],
      count: 0,
    };
    const ids: Array<string> = [];
    const newState: Array<ICartItemDetail> = [];

    const cartService = new Services.Carts(
      process.env.NEXT_PUBLIC_API_ID_CART!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );

    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );

    const fetch = await cartService.getAsync();
    fetchedCart = await fetchedCart.concat(fetch.data ? fetch.data : fetch as any);

    fetchedCart.forEach((x) => {
      if (!x.isChanged) {
        ids.push(x.productId);
      }
    });

    const filter: ConditionExpression = {
      type: 'Membership',
      subject: 'id',
      values: ids,
    };

    do {
      scanResult = await productService.scanAsync(
        50,
        scanResult?.lastEvaluatedKey?.id,
        undefined,
        undefined,
        filter,
      );
      fetchedProducts = fetchedProducts.concat(scanResult.count
        ? scanResult.data : scanResult as any);
    } while (scanResult?.lastEvaluatedKey);

    fetchedProducts.forEach((x) => {
      const prod: Omit<IProduct, 'id'> & { id?: string } = x;
      delete prod.id;
      const cart: ICart = fetchedCart.find((y) => y.productId === x.id)!;

      newState.push({
        ...cart,
        ...prod,
      });
    });

    return Promise.resolve(newState);
  };

  /**
   * Add quantity to a specific item and store it
   * @param id Cart id
   * @param quantity Quantitu to add
   * @returns Void
   */
  const addQuantity = async (id: string, quantity: number): Promise<void> => {
    const item = state.data.find((x) => x.id === id);
    if (!item) return;

    if (item.quantity + quantity > (item.availabilityQta ? item.availabilityQta : 0)) {
      setState(setError(state, {
        name: 'Add quantity operation denied',
        message: 'Cannot add more of the avaiability', // TODO Clear message
      }));
      return;
    }

    try {
      const cartService = new Services.Carts(
        process.env.NEXT_PUBLIC_API_ID_CART!,
        process.env.NEXT_PUBLIC_API_REGION!,
        process.env.NEXT_PUBLIC_API_STAGE!,
        session?.accessToken as string,
        session?.idToken as string,
      );

      const newQuantity = item.quantity + quantity;

      setState(addQuantityToState(state, item.id, newQuantity));
      await cartService.changeQuantityAsync(item.id, newQuantity);
    } catch (err) {
      setState(addQuantityToState(state, item.id, 0 - quantity));
      setState(setError(state, err.error));
    }
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
            addQuantity={addQuantity}
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
