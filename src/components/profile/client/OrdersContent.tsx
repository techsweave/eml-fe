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

const OrdersContent = (prop: { ordersContent: Models.Tables.IOrder[] }) => {
    const { ordersContent } = prop;
    console.log(ordersContent);
    return (
        <Box p={5}>
            <Heading size="md">My orders</Heading>
            <OrdersTable ordersList={ordersContent} />
        </Box>

    );
};

export default OrdersContent;
