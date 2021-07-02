import OrderItem from '@components/order/OrderItem';
import { Models } from 'utilities-techsweave';
import React from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';

const OrderList = (prop: { orderList: Models.Tables.IOrder[] }) => {
  const { orderList } = prop;

  return (
    <Box>
      <Grid ml={['0', '0', '50', '50']} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={10}>
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
    </Box>

  );
};

export default OrderList;