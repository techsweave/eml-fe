import CartItem from '@components/cart/CartItem';
import { Models } from 'utilities-techsweave';
import React from 'react';
import {
  Table, Thead, Tbody, Tr, Th, TableCaption,
} from '@chakra-ui/react';

const CartList = (prop: { product: Models.Tables.IProduct[] }) => {
  const { product } = prop;
  return (
    <Table variant="simple">
      <TableCaption>product is ready</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Description</Th>
          <Th>Quantity</Th>
        </Tr>
      </Thead>
      <Tbody>
        {product.map((products) => (
          <CartItem
            product={products}
            key={products.id}
          />
        ))}
      </Tbody>

    </Table>
  );
};

export default CartList;
