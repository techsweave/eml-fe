import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Models } from 'utilities-techsweave';
import { getProductsData } from '@test/ProductMock';

const OrderDetail = (prop) => {
  const { products } = prop;
  return (

    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Product ID</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total €</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((orderData) => {
            const productData = getProductsData(orderData.productId);
            return (
              <Tr>
                <Td><Link href={{ pathname: '/products/detail/[id]', query: { id: productData.id } }}>{productData.title}</Link></Td>
                <Td>{productData.id}</Td>
                <Td>{productData.price}</Td>
                <Td>{ orderData.quantity}</Td>
                <Td>{orderData.quantity * productData.price}</Td>
              </Tr>
            );
          })}

        </Tbody>
      </Table>
    </Box>
  );
};
export default OrderDetail;
