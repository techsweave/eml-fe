import Link from 'next/link';
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/layout';
import {
  Box,
  Image,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button
} from '@chakra-ui/react';

const OrderItem = (prop: { order: Models.Tables.IOrder }) => {
  const { order } = prop;
  console.log(order);

  const [state, setState] = useState(new Array());
  const [isLoading, setLoading] = useState(true);


  let total = 0;
  if (order.products)
    order.products.map((item) => {
      total += item.price * item.quantity;
    })

  async function getProductOrders() {
    let ids: Array<string> = [];

    if (order.products)
      order.products.map((item) => {
        ids.push(item.productId);
      })
    const productService = new Services.Products(process.env.NEXT_PUBLIC_API_ID_PRODUCTS!, process.env.NEXT_PUBLIC_API_REGION!, process.env.NEXT_PUBLIC_API_STAGE!);
    const products: Array<Models.Tables.IProduct> = (await productService.scanAsync(25, undefined, undefined, undefined, {
      type: 'Membership',
      subject: 'id',
      values: ids
    })).data;

    return order?.products!.map(subject => {
      const otherSubject = products.find(element => element.id === subject.productId);
      return { ...subject, ...otherSubject };
    });


  }

  useEffect(() => {
    if (state != new Array()) return;
    const l = isLoading;
    if (!l) return
    getProductOrders().then(
      (data) => {
        setState(data)
        setLoading(false)
      }
    ).catch(
      (err) => {
        console.log(err.message);
      }
    )
  }, [state, setState]);

  console.log(state);


  if (!isLoading)
    return (
      <Box as="button" w='100%'>
        <Stack position='relative'>
          <Table variant="simple">
            <TableCaption>Total: {total} €</TableCaption>
            <Thead>
              <Tr>
                <Th>{order.date.toUTCString()}</Th>
                <Th>{order.userId}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {state.map((item) => {
                return (
                  <Tr>
                    <Td><Image src={item.imageURL} alt={item.title}></Image></Td>
                    <Td><Link href={{ pathname: '/products/detail/[id]', query: { id: item.productId } }}>{item.title}</Link></Td>
                    <Td>Subtotal: {item.price * item.quantity}</Td>
                  </Tr>
                )
              })}
            </Tbody>
            <Tfoot>
              <Link href={{ pathname: '/orders/detail/[id]', query: { id: order.id } }}>
                <Button> Go to detail </Button>
              </Link>
            </Tfoot>
          </Table>
        </Stack>
      </Box >
    );
  else
    return <h1></h1>
};
export default OrderItem;
