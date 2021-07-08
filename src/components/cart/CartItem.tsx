// import cartStyles from '@styles/Cart.module.css';
import React, { useState, useEffect } from 'react';
import {
  Flex, IconButton, Image, Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Models } from 'utilities-techsweave';
import { FaPlus, FaMinus } from 'react-icons/fa'

type ICart = Models.Tables.ICart;
type IProduct = Models.Tables.IProduct;
type ICartItemDetail = ICart & Omit<IProduct, 'id'>

const CartItem = (prop: {
  cartItem: ICartItemDetail,
  addQuantity: (id: string, val: number) => Promise<void>,
  removeProduct: (id: string) => Promise<void>
}) => {
  const { cartItem, addQuantity, removeProduct } = prop;
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
          src={cartItem.imageURL}
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
            href={`/products/detail/${cartItem.productId}`}
          >
            {cartItem.title}
          </Link>

        </Text>
        <Text
          color='gray.700'
          fontSize='xl'
        >
          {(cartItem.discount ? (cartItem.price! - (cartItem.price! * cartItem.discount! / 100)) : cartItem.price)?.toString().concat(' €')}
        </Text>
        <Text
          color='gray.500'
        >
          <Text
            as='del'
          >
            {cartItem.discount ? cartItem.price?.toString().concat('€') : undefined}
          </Text>

          {' '.concat(
            cartItem.discount ?
              cartItem.discount?.toString().concat('%')
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
          onClick={() => addQuantity(cartItem.id, -1)}
          borderRadius='50%'
          size='xs'
          padding='3px'
        />
        <Text
          fontSize='xl'
          padding='8px'
        >
          {cartItem.quantity}
        </Text>
        <IconButton
          aria-label='add one to quantity'
          icon={<FaPlus />}
          onClick={() => addQuantity(cartItem.id, 1)}
          borderRadius='50%'
          size='xs'
          padding='3px'
        />
      </Flex>
    </Flex>
  );
};

export default CartItem;
