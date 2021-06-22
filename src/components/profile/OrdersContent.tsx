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

const OrdersContent = (prop: { ordersContent: Models.Tables.IOrder[] }) => (
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
        <OrdersTable ordersList={OrderMock} />
  </Box>
//   <Tabs m={10} w="full" variant="line" colorScheme="none">
//     <TabList w="full" justifyContent="space-evenly">
//       <Tab>Last Month Orders</Tab>
//       <Tab>Last 3 Month Orders</Tab>
//       <Tab>Last 6 Month Orders</Tab>
//       <Tab>Last 12 Month Orders</Tab>
//       <Tab>All Orders</Tab>
//     </TabList>
//     <TabPanels>
//       <TabPanel>
//         <OrdersTable />
//       </TabPanel>
//       <TabPanel>
//         <p>Ordini ultimi 3 mesi</p>
//       </TabPanel>
//       <TabPanel>
//         <p>Ordini ultimi 6 mesi</p>
//       </TabPanel>
//       <TabPanel>
//         <p>Ordini ultimi 12 mesi</p>
//       </TabPanel>
//       <TabPanel>
//         <p>Tutti gli ordini</p>
//       </TabPanel>
//     </TabPanels>
//   </Tabs>
);

export default OrdersContent;
