// import cartStyles from '@styles/Cart.module.css';
import React from 'react';
import { Tr, Td } from '@chakra-ui/react';
import Link from 'next/link';

const CartItem = (prop) => {
  const { product } = prop;
  return (
    <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
      <Tr>
        <Td>{product.title}</Td>
        <Td>{product.price}</Td>
        <Td>{product.description}</Td>
        <Td>{product.quantity}</Td>
      </Tr>
    </Link>
  );
};

export default CartItem;
