import CartItem from '@components/cart/CartItem';
import { Models } from 'utilities-techsweave';
import ProductMock, { getProductsArayData } from '@test/ProductMock';

// import cartStyles from '@styles/Cart.module.css';
import React from 'react';
import {
  Table, Thead, Tbody, Tr, Th, TableCaption,
} from '@chakra-ui/react';

const CartList = (prop: { cart: Models.Tables.ICart[] }) => {
  const { cart } = prop;
  return (
    <Table variant="simple">
      <TableCaption>Cart is ready</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Description</Th>
          <Th>Quantity</Th>
        </Tr>
      </Thead>
      <Tbody>
        {cart.map((products) => (
          <CartItem
            product={products.product}
            key={products.id}
          />
        ))}
      </Tbody>

    </Table>
  );
};

export default CartList;
