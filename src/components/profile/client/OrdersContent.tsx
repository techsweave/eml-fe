import React from 'react';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Heading,
  Button,
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
            <OrdersTable ordersList={ordersContent} />
        </Box>

    );
};

export default OrdersContent;
