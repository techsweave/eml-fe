import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Text,
  Center,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
import { getProductsData } from '@test/ProductMock';
import { Models } from 'utilities-techsweave';

function getTableSize() {
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  if (isSmallerThan600) return 'sm';
  return 'md';
}

const OrderDetail = (prop: {
  products: Models.Tables.IOrderedProduct[],
  order: Models.Tables.IOrder
}) => {
  const { products } = prop;
  const { order } = prop;
  return (
    <Box minW="full">
      <Box mb="10">
        <Center>
          <Heading as="h6" mb="2">
            {order.id}
            {' '}
            details
          </Heading>
        </Center>
        <Center>
          <Text>
            Purchased on:
            {' '}
            {order.date}
          </Text>
        </Center>
      </Box>
      <Table variant="simple" size={getTableSize()}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th display={['none', 'none', 'table-cell', 'table-cell']}>Product ID</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((orderData) => {
            const productData = getProductsData(orderData.productId);
            return (
              <Tr _hover={{ backgroundColor: 'blue.100' }}>
                <Td><Link href={{ pathname: '/products/detail/[id]', query: { id: productData.id } }}>{productData.title}</Link></Td>
                <Td display={['none', 'none', 'table-cell', 'table-cell']}>{productData.id}</Td>
                <Td>{productData.price}</Td>
                <Td>{ orderData.quantity}</Td>
                <Td>{orderData.quantity * productData.price}</Td>
              </Tr>
            );
          })}

        </Tbody>
      </Table>
      <Center><Button as="a" href="/profile/client/profileOrders" w={['full', 'full', '600px', '900px']} m="10">Back</Button></Center>
    </Box>
  );
};
export default OrderDetail;
