import { AuthenticatedUser, Services, Models } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { Button } from '@chakra-ui/button';
import { Link } from '@chakra-ui/layout';

const addCart = (prop: { product: Models.Tables.IProduct, quantity: number }) => {
  const { product, quantity } = prop;
  const session = useSession()[0];
  const qty = quantity >= product.availabilityQta! ? product.availabilityQta! : quantity;
  const [userState, setState] = useState<boolean>();
  const handleClick = async () => {
    const caller = new Services.Carts(`${process.env.NEXT_PUBLIC_API_ID_CART}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, session?.accessToken as string, session?.idToken as string);
    await caller.addProductAsync(product.id, qty);
  };
  async function isVendor(s) {
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!);
  }
  useEffect(() => {
    const s = session;
    if (userState !== undefined) return;
    if (!s) return;
    isVendor(s).then(
      (data) => {
        setState(data);
      },
    ).catch(
      (err) => {
        console.log(err.message);
      },
    );
  }, [userState, setState, session]);
  return (
    <Link href='/cart' hidden={userState || !session ? true : undefined}>
      <Button onClick={handleClick}>Add to Cart</Button>
    </Link>
  );
};
export default addCart;
