import { Services } from 'utilities-techsweave';
import React from 'react';
import { useSession } from 'next-auth/client';
import { Button } from '@chakra-ui/button';
import { Link } from '@chakra-ui/layout';

const addCart = ({ ...props }) => {
  const { product, quantity } = props;
  const session = useSession()[0];
  const handleClick = async () => {
    const caller = new Services.Carts(`${process.env.NEXT_PUBLIC_API_ID_CART}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, session?.accessToken as string, session?.idToken as string);
    await caller.addProductAsync(product, quantity);
  };

  return (
    <Link href='/cart'>
      <Button onClick={handleClick}>Add to Cart</Button>
    </Link>
  );
};
export default addCart;
