import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Center,
  Button,
  Stack,
  Grid,
  GridItem,
  Image,
  Flex,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Models, Services } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';

type IProduct = Models.Tables.IProduct;
const init: any[] = [];
const initLoading = true;

const OrderDetail = (prop: {
  products: Models.Tables.IOrderedProduct[],
  order: Models.Tables.IOrder,
  vendor: boolean,
}) => {
  const toast = useToast();
  const { products, order, vendor } = prop;
  const [error, setError] = useState<Error>();
  const [state, setState] = useState(init);
  const [loading, setLoading] = useState(initLoading);
  const fetchData = async (): Promise<Array<any>> => {
    let fetchedData: IProduct[] = [];
    const caller = new Services.Products(
      `${process.env.NEXT_PUBLIC_API_ID_PRODUCTS}`,
      `${process.env.NEXT_PUBLIC_API_REGION}`,
      `${process.env.NEXT_PUBLIC_API_STAGE}`,
    );
    const filterId: string[] = [];
    products.forEach((x) => filterId.push(x.productId));
    const filter: ConditionExpression = {
      type: 'Membership',
      subject: 'id',
      values: filterId,
    };
    const ret = await caller.scanAsync(25, undefined, undefined, undefined, filter);
    fetchedData = fetchedData.concat(ret.count ? ret.data : ret as any);
    const mergedCartProducts = products.map(((subject) => {
      const otherSubject = fetchedData.find((element) => element.id === subject.productId);
      return { ...subject, ...otherSubject };
    }));
    return Promise.resolve(mergedCartProducts);
  };
  useEffect(() => {
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!loading) return;
    if (error) return;

    fetchData()
      .then((data) => {
        setLoading(false);
        setState(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.error);
      });
  }, [state, setState, error, setError, loading, setLoading]);
  if (error) {
    toast({
      title: error.name,
      description: error.message,
      status: 'error',
      duration: 10000,
      isClosable: true,
      position: 'top-right',
    });
  }
  let total = 0;
  state.forEach((item) => {
    total += item.price * item.quantity;
  });
  return (
    <Box w="90%">
      <Center>
        {vendor ? <Link href={{ pathname: '/usersList/detail/[id]', query: { id: order.userId } }}>{order.userId}</Link> : <Text>{order.userId}</Text>}
      </Center>
      <Flex justifyContent='space-between' mt='5'>
        <Text fontWeight='bold'>
          {order.id}
        </Text>
        <Text fontWeight='bold'>
          Total:
          <br />
          {total}
          {' '}
          €
        </Text>
      </Flex>
      <Center>
        <Text fontWeight='bold'>
          Order status:
          <Text color={order.status === 'IN PROGRESS' ? 'red' : 'inherit'}>
            {order.status}
          </Text>
        </Text>
      </Center>
      <Grid templateColumns='repeat(1, 1fr)'>

        {state.map((productData) => (
          <GridItem
            key={productData.id}
          >
            <Box as='button' mt='5'>
              <Link href={{ pathname: '/products/detail/[id]', query: { id: productData.id } }}>
                <div>
                  <Text fontWeight='bold' textAlign='center' mb='5'>{productData.title}</Text>
                  <Flex justifyContent='space-evenly' alignItems='center'>
                    <Image src={productData.imageURL} fallbackSrc="/images/fallback.jpg" alt={productData.title} w='200px' h='200px' borderRadius="15px" fit="scale-down" />
                    <Stack>
                      <Text>
                        Price:
                        {' '}
                        {productData.price.toFixed(2)}
                        {' '}
                        €
                      </Text>
                      <Text>
                        Quantity:
                        {' '}
                        {productData.quantity}

                      </Text>
                    </Stack>
                  </Flex>
                  <Text mt='5' textAlign='center'>
                    Subtotal:
                    {' '}
                    {(productData.price * productData.quantity.toFixed(2))}
                    {' '}
                    €
                  </Text>
                </div>
              </Link>
            </Box>
          </GridItem>
        ))}
      </Grid>
      <Center />
      <Center><Button as="a" href="/orders" w={['full', 'full', '600px', '900px']} m="10">Back</Button></Center>
    </Box>
  );
};
export default OrderDetail;
