import CartItem from '@components/cart/CartItem';
import { Models, Services } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, TableCaption,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';

type ICart = Models.Tables.ICart;

const init: Array<ICart> = [];

const CartList = () => {
  const [state, setState] = useState(init);
  const [error, setError] = useState<Error>();
  const session = useSession()[0];

  const fetchData = async (): Promise<Array<ICart>> => {
    let fetchedData: Array<ICart> = [];

    const cartService = new Services.Carts(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );

    const fetch = await cartService.getAsync();
    fetchedData = fetchedData.concat(fetch.data);

    return Promise.resolve(fetchedData);
  };

  useEffect(() => {
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (state.length > 0) return;

    fetchData()
      .then((data) => {
        setState(data);
      })
      .catch((err) => {
        setError(err.error);
      });
  }, [state, setState, error, setError]);

  return (
    <Table variant="simple">
      <TableCaption>product is ready</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Description</Th>
          <Th>Quantity</Th>
        </Tr>
      </Thead>
      <Tbody>
        {state.map((cartRecord) => (
          <CartItem
            cartItem={cartRecord}
            key={cartRecord.id}
          />
        ))}
      </Tbody>

    </Table>
  );
};

export default CartList;
