import OrderItem from '@components/order/OrderItem';
import { Models } from 'utilities-techsweave';
import React from 'react';
import {
  Grid,
  GridItem,
  Box,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { VscChevronRight } from 'react-icons/vsc';
import Link from 'next/link';

const OrderList = (prop: { orderList: Models.Tables.IOrder[] }) => {
  const { orderList } = prop;

  return (
    <Box justifyContent='center' >
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={30}
        display={['none', 'none', 'grid', 'grid']}>
        {orderList.map((orders) => (
          <GridItem
            key={orders.id}
          >
            <OrderItem
              order={orders}
              key={orders.id}
            />
          </GridItem>
        ))}
      </Grid>
      <Table variant="simple" display={['inherit', 'inherit', 'none', 'none']} size='lg'>
        <TableCaption>Orders</TableCaption>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Date</Th>
            <Th>Total</Th>
            <Th>Detail</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderList.map((orders) => {
            let total = 0;
            if (orders.products)
              orders.products.forEach((item) => {
                total += item.price * item.quantity;
              });
            return (

              <Tr _hover={{ backgroundColor: 'blue.100' }}>
                <Td>{orders.id}</Td>

                {/* <Td>{orders.date.getDate()}-{orders.date.getMonth() + 1}-{orders.date.getFullYear()}</Td> */}
                <Td>
                  Date:
                  {' '}
                  {JSON.stringify(orders.date).split('T')[0].split('"')[1]}
                  {'\n'}
                  Time:
                  {' '}
                  {JSON.stringify(orders.date).split('T')[1].split('.')[0]}
                </Td>
                <Td>
                  {total}
                </Td>
                <Td>
                  <Link href={{ pathname: '/profile/client/orders/[id]', query: { id: orders.id } }}>
                    <IconButton
                      size="sm"
                      rounded="md"
                      aria-label="Order detail"
                      icon={<VscChevronRight />} />
                  </Link>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>

  );
};

export default OrderList;