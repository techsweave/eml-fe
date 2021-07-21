import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  CircularProgress,
  Grid,
  GridItem,
  IconButton,
  useMediaQuery
} from '@chakra-ui/react';
import { VscChevronRight } from 'react-icons/vsc';
import showError from '@libs/showError';

const init: any[] = [];

const OrderItem = (prop: { order: Models.Tables.IOrder }) => {
  const { order } = prop;

  const [state, setState] = useState(init);
  const [isLoading, setLoading] = useState(true);

  let total = 0;
  if (order.products) {
    order.products.forEach((item) => {
      total += item.price * item.quantity;
    });
  }
  async function getProductOrders(l) {
    if (!l) return state;
    const ids: Array<string> = [];

    if (order.products) {
      order.products.forEach((item) => {
        ids.push(item.productId);
      });
    }
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
    );
    const products: Array<Models.Tables.IProduct> = (
      await productService.scanAsync(25, undefined, undefined, undefined, {
        type: 'Membership',
        subject: 'id',
        values: ids,
      })
    ).data;

    return (order?.products as Array<Models.Tables.IOrderedProduct>).map((subject) => {
      const otherSubject = products.find((element) => element.id === subject.productId);
      return { ...subject, ...otherSubject };
    });
  }

  useEffect(() => {
    const l = isLoading;
    if (state.length !== 0) return;
    getProductOrders(l).then(
      (data) => {
        setState(data);
        setLoading(false);
      },
    ).catch(
      (err) => {
        showError(err);
      },
    );
  }, [state, setState, isLoading, setLoading]);

 

  if (!isLoading) {
    return (
      <Box w='100%' border='1px' borderColor='var(--chakra-colors-gray-100)' borderRadius='15px'>
        <Stack position='relative'>
          <Table variant='striped' alignContent='center'>
            <TableCaption>
              Total:
              {' '}
              {total}
              {' '}
              €
            </TableCaption>
            <Thead>
              <Tr>
                <Th textAlign='center'>
                  Customer:
                  {' '}
                  {order.userId}
                </Th>
                <Th colSpan={2} />
                <Th textAlign='center'>
                  Order:
                  {' '}
                  {order.id}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textAlign='center' colSpan={4} textStyle='bold'>
                  Date:
                  {' '}
                  {JSON.stringify(order.date).split('T')[0].split('"')[1]}
                  {' '}
                  Time:
                  {' '}
                  {JSON.stringify(order.date).split('T')[1].split('.')[0]}
                </Td>
              </Tr>
              {state.map((item) => (
                <Tr key={item.title}>
                  <Td><Image fallbackSrc="/images/fallback.png" src={item.imageURL} alt={item.title} maxWidth='250px' /></Td>
                  <Td>{item.title}</Td>
                  <Td>
                    <Grid>
                      <GridItem>
                        Price:
                        {' '}
                        {item.price.toFixed(2)}
                        €
                      </GridItem>
                      <GridItem>
                        Quantity:
                        {' '}
                        {item.quantity}
                      </GridItem>
                    </Grid>
                  </Td>
                  <Td textAlign='center'>
                    Subtotal:
                    {(item.price * item.quantity.toFixed(2))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack >
      </Box >
    );
  }
  return (
    <Flex justifyContent='center'>
      <CircularProgress
        isIndeterminate
        color='red.300'
        size='3em'
      />
    </Flex>

  );
};
export default OrderItem;
