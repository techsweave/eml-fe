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
} from '@chakra-ui/react';
import Link from 'next/link';
import { Models, Services } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import showError from '../../libs/showError';

type IProduct = Models.Tables.IProduct;
const init: any[] = [];
const initLoading = true;

const OrderDetail = (prop) => {
  const { products, order } = prop;
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
    fetchedData = (await caller.scanAsync(25, undefined, undefined, undefined, filter)).data;
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
  showError(error);
  let total = 0;
  state.forEach((item) => {
    total += item.price * item.quantity;
  });
  return (
    <Box minW="95%">
      <Flex justifyContent='space-between' mt='5'>
        <Text fontWeight='bold'>
          {order.id}
        </Text>
        <Text fontWeight='bold'>
          Total:
          {' '}
          {total}
          {' '}
          €
        </Text>
      </Flex>
      <Grid templateColumns='repeat(1, 1fr)'>

        {state.map((productData) => (
          <GridItem
            key={productData.id}
          >
            <Box as='button' mt='5'>
              <Link href={{ pathname: '/products/detail/[id]', query: { id: productData.id } }}>
                <div>
                  <Text fontWeight='bold' textAlign='center' mb='5'>{productData.title}</Text>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Image src={productData.imageURL} fallbackSrc="/images/fallback.png" alt={productData.title} w='200px' h='200px' borderRadius="15px" fit="cover" />
                    <Stack ml='10'>
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
      <Center><Button as="a" href="/orders" w={['full', 'full', '600px', '900px']} m="10">Back</Button></Center>
    </Box>
  );
};
export default OrderDetail;
