import React from 'react';
import {
  Box,
  Center,
  Heading,
  Select,
} from '@chakra-ui/react';
import { VscChevronDown } from 'react-icons/vsc';
import OrdersTable from './orders/OrdersTable';
import { Models } from 'utilities-techsweave';
import OrderMock from '@test/OrderMock';

const OrdersContent = (prop: { ordersContent: Models.Tables.IOrder[] }) => (
  <Box p={5}>
        <Center>
            <Heading size="md">My orders</Heading>
        </Center>
    <Select
      placeholder="Last month orders"
      variant="filled"
      mt={5}
      mb={5}
    >
      <option value="Last 3 months orders">Last 3 months orders</option>
      <option value="Last 6 months orders">Last 6 months orders</option>
      <option value="Last 12 months orders">Last 12 months orders</option>
      <option value="All orders">All orders</option>
    </Select>
        <OrdersTable ordersList={OrderMock} />
  </Box>
);

export default OrdersContent;
