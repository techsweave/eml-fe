// import cartStyles from '@styles/Cart.module.css';
import React, { useState, useEffect } from 'react';
import {
  Flex, IconButton, Image, Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Models, Services } from 'utilities-techsweave';
import { FaPlus, FaMinus } from 'react-icons/fa'
import showError from '@libs/showError'
import { useSession } from 'next-auth/client';

type ICart = Models.Tables.ICart;
type IProduct = Models.Tables.IProduct;
type ICartItemDetail = ICart & Omit<IProduct, 'id'>
type IState = {
  loading: boolean,
  error?: Error,
  data?: ICartItemDetail
}

const CartItem = (prop: { cartItem: ICart, updateState: (id?: string) => Promise<void> }) => {
  const [state, setState] = useState<IState>({
    loading: true,
  });
  const session = useSession()[0];
  const { cartItem, updateState } = prop;

  const setStateFunction = (state: IState, val: number) => {
    if (!state.data) return state;

    const newState: IState = {
      loading: false,
      data: {
        ...state.data,
        quantity: state.data.quantity + val
      },
    };
    return newState;
  }

  const setError = (state: IState, err: Error) => {
    const newState: IState = {
      loading: false,
      data: state.data,
      error: err
    };
    return newState;
  }

  const addQuantity = async (value: number) => {
    if (!state.data) return;

    if (state.data.quantity + value > (state.data.availabilityQta ? state.data.availabilityQta : 0)) {
      setState(setError(state, {
        name: 'Add quantity operation denied',
        message: 'Cannot add more of the avaiability' //TODO Clear message
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

      const quantity = state.data.quantity + value;

      setState(setStateFunction(state, value));
      await cartService.changeQuantityAsync(state.data.id, quantity);

      if (state.data.quantity - value <= 0) {
        updateState();
        return;
      }

    } catch (err) {
      setState(setStateFunction(state, 0 - value));
      setState(setError(state, err.error));
    }
  }

  const getProduct = async (): Promise<ICartItemDetail> => {
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );

    let prod: Omit<IProduct, 'id'> & { id?: string } = await productService.getAsync(cartItem.productId);
    delete prod.id;

    const newState: ICartItemDetail = { ...cartItem, ...prod }
    return newState;
  }

  useEffect(() => {
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!state.loading) return;
    if (state.error) return;

    getProduct()
      .then((data) => {
        setState({
          loading: false,
          data: data
        });
      })
      .catch((err) => {
        setState({
          loading: false,
          error: err.error
        });
      });
  }, [state, setState]);

  showError(state.error);

  if (state.loading || !state.data) {
    return <Flex />;
  }

  return (
    <Flex
      direction='row'
      padding='1em'
    >
      <Flex
        width='40%'
        justifyContent='center'
        alignItems='center'
      >
        <Image
          boxSize='90%'
          objectFit='cover'
          src={state.data.imageURL}
          fallbackSrc="/images/fallback.png"
          borderRadius='10px'
        />
      </Flex>
      <Flex
        direction='column'
        justifyContent='center'
        padding='1em'
        width='60%'
      >
        <Text
          fontSize='xl'
          fontWeight='semibold'
        >
          <Link
            href={`/products/detail/${state.data.productId}`}
          >
            {state.data.title}
          </Link>

        </Text>
        <Text
          color='gray.700'
          fontSize='xl'
        >
          {(state.data.discount ? (state.data.price! - (state.data.price! * state.data.discount! / 100)) : state.data.price)?.toString().concat(' €')}
        </Text>
        <Text
          color='gray.500'
        >
          <Text
            as='del'
          >
            {state.data.discount ? state.data.price?.toString().concat('€') : undefined}
          </Text>

          {' '.concat(
            state.data.discount ?
              state.data.discount?.toString().concat('%')
              : '')}
        </Text>
      </Flex>
      <Flex
        direction='row'
        alignItems='center'
        width='30%'
      >
        <IconButton
          aria-label='remove one from quantity'
          icon={<FaMinus />}
          onClick={() => addQuantity(-1)}
          borderRadius='50%'
          size='xs'
          padding='3px'
        />
        <Text
          fontSize='xl'
          padding='8px'
        >
          {state.data.quantity}
        </Text>
        <IconButton
          aria-label='add one to quantity'
          icon={<FaPlus />}
          onClick={() => addQuantity(1)}
          borderRadius='50%'
          size='xs'
          padding='3px'
        />
      </Flex>
    </Flex>
  );
};

export default CartItem;
