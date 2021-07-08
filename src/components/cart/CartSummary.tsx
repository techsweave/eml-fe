import { Models } from 'utilities-techsweave';
import React from 'react';
import {
  Flex, Text, Heading, Button,
} from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';

type ICart = Models.Tables.ICart;
type IProduct = Models.Tables.IProduct;
type ICartItemDetail = ICart & Omit<IProduct, 'id'>

const CartSummary = (props: { cart: Array<ICartItemDetail> }) => {
  const { cart } = props;
  let totalNoDiscount = 0;
  let total = 0;

  cart.forEach((x) => {
    let price = x.price ? x.price : 0;
    totalNoDiscount += price * x.quantity;
    if (x?.discount) {
      price -= ((price / 100) * x.discount!);
    }
    total += price * x.quantity;
  });

  const goToChechOut = async () => {
    // TODO
    alert("Magikarp used splash! But nothing appened!")
  }

  return (
    <Flex
      direction='column'
      width={['100%', '100%', '30%', '30%', '30%']}
      padding='1em'
    >
      <Text
        color='gray.500'
        fontSize='xl'
      >
        Total:
      </Text>
      <Heading
        as='h3'
      >
        {total}
        €
      </Heading>
      <Text
        as='del'
        color='gray.500'
        fontSize='lg'
      >
        {totalNoDiscount}
        €
      </Text>
      <Text
        color='gray.500'
        fontSize='lg'
      >
        {(Math.round(
          100 * 100 * (
            (totalNoDiscount - total)
            / totalNoDiscount),
        ) / 100)
          .toString()
          .replace('.', ',')
          .concat(' % saved!')}
      </Text>
      <Button
        mt='3%'
        leftIcon={<FaShoppingBag />}
        variant='solid'
        backgroundColor='red.400'
        height='4em'
        color='white'
        _hover={{
          backgroundColor: 'red.500',
        }}
        onClick={goToChechOut}
      >
        <Text
          fontSize='xl'
          fontWeight='bold'
          color='white'
        >
          Checkout
        </Text>
      </Button>
    </Flex>
  );
};

export default CartSummary;
