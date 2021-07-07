import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Text,
  Center,
  Button,
  useMediaQuery,
  Stack,
  Grid,
  GridItem,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Models, Services } from 'utilities-techsweave';
import { ConditionExpression } from '@aws/dynamodb-expressions';

type IProduct = Models.Tables.IProduct;
const init: any[] = [];
const initLoading = true;

const OrderDetail = (prop) => {
  const { products } = prop;
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
  return (
    <Box minW="full">
      <Grid templateColumns='repeat(1, 1fr)' alignItems='center'>
        {state.map((productData) => (
          <GridItem
            key={productData.id}
          >
            <Box as='button' w='100%'>
              <Link href={{ pathname: '/products/detail/[id]', query: { id: productData.id } }}>
                <Stack>
                  <Text textAlign='center'>{productData.title}</Text>
                  <Flex alignItems='flex-end'>
                    <HStack>
                      <Image src={productData.imageURL} fallbackSrc="/images/fallback.png" alt={productData.title} w="50%" h='50%' borderRadius="15px" fit="cover" />
                      <Stack>
                        <Text>
                          Price:
                          {' '}
                          {productData.price}
                        </Text>
                        <Text>
                          Quantity:
                          {' '}
                          {productData.quantity}
                        </Text>
                      </Stack>
                      <Text>
                        Total:
                        {' '}
                        {productData.price * productData.quantity}
                      </Text>
                    </HStack>
                  </Flex>
                </Stack>
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
