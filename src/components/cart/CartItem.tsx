// import cartStyles from '@styles/Cart.module.css';
import React from 'react';
import { Tr, Td } from '@chakra-ui/react';

const CartItem = (prop) => {
  const { product } = prop;
  return (
    <Tr>
      <Td>{product.title}</Td>
      <Td>{product.price}</Td>
      <Td>{product.description}</Td>
      <Td>{product.quantity}</Td>
    </Tr>
  );
};

export default CartItem;
