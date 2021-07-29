import OrderItem from './OrderItem';
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
  Tr,
  Text,
} from '@chakra-ui/react';
import { VscChevronRight } from 'react-icons/vsc';
import Link from 'next/link';

const OrderList = (prop: { orderList: Models.Tables.IOrder[] }) => {
  const { orderList } = prop;
  if (!orderList[0].id) {
    return (
      <Text fontWeight='bold' fontSize='4xl' mt='5'>No order found, please continue with <Link href='/products'><Text as='u' color='blue' cursor='pointer'>shopping</Text></Link></Text>)
  } else {
    return (
      <Box justifyContent='center' >
        <Grid
          gap={30}
          display={['none', 'none', 'inherit', 'inherit']}>
          {orderList.map((orders) => (
            <GridItem
              mb='14'
              key={orders.id}
            >
              <OrderItem
                order={orders}
                key={orders.id}
              />

            </GridItem>
          ))}
        </Grid>
        <Table variant="simple" display={['inherit', 'inherit', 'none', 'none']} size='sm'>
          <TableCaption>Orders</TableCaption>
          <Thead>
            <Tr>
              <Th>State</Th>
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

                <Tr _hover={{ backgroundColor: 'blue.100' }} key={orders.id}>
                  <Td color={orders.status === 'IN PROGRESS' ? 'red' : 'inherit'}>{orders.status}</Td>
                  <Td>
                    {JSON.stringify(orders.date).split('T')[0].split('"')[1]}
                  </Td>
                  <Td>
                    {total}
                  </Td>
                  <Td>
                <Link href={{ pathname: 'orders/detail/[id]', query: { id: orders.id } }}>
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
}

export default OrderList;
