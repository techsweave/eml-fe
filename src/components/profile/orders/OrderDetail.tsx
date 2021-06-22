import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
} from '@chakra-ui/react';

const OrderDetail = () => (
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
        <Tr>
          <Td><Link href="/">Product 1</Link></Td>
          <Td>id</Td>
          <Td>price</Td>
          <Td>q</Td>
          <Td>amount</Td>
        </Tr>
        <Tr>
          <Td><Link href="/">Product 2</Link></Td>
          <Td>id</Td>
          <Td>price</Td>
          <Td>q</Td>
          <Td>amount</Td>
        </Tr>
        <Tr>
          <Td><Link href="/">Product 3</Link></Td>
          <Td>id</Td>
          <Td>price</Td>
          <Td>q</Td>
          <Td>amount</Td>
        </Tr>
      </Tbody>
    </Table>
  </Box>
);

export default OrderDetail;
