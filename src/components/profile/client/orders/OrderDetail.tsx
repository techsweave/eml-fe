import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
      `${process.env.NEXT_PUBLIC_API_ID_PRODUCT}`,
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

    <Box w={['min-content']}>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Product ID</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.map((productData) => (
            <Tr>
              <Td><Link href={{ pathname: '/products/detail/[id]', query: { id: productData.id } }}>{productData.title}</Link></Td>
              <Td>{productData.id}</Td>
              <Td>{productData.price}</Td>
              <Td>{productData.quantity}</Td>
              <Td>{productData.price * productData.quantity}</Td>
            </Tr>
          ))}

        </Tbody>
      </Table>
    </Box>
  );
};
export default OrderDetail;
