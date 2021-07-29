import { AuthenticatedUser, Services, Models } from 'utilities-techsweave';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import {
  useToast, Box, Button, Text, Stack,
} from '@chakra-ui/react';
import showError from '../../libs/showError';

const addCart = (prop: { product: Models.Tables.IProduct, quantity: number }) => {
  const toast = useToast();
  const { product, quantity } = prop;
  const session = useSession()[0];
  const qty = quantity >= product.availabilityQta! ? product.availabilityQta! : quantity;
  const [userState, setState] = useState<boolean>();
  const handleClick = async () => {
    const caller = new Services.Carts(`${process.env.NEXT_PUBLIC_API_ID_CART}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, session?.accessToken as string, session?.idToken as string);
    let result;
    try { result = await caller.addProductAsync(product.id, qty); } catch (error) {
      toast({
        title: error.error.name,
        description: error.error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      });
    }
    if (result.productId === product.id) {
      toast({
        position: 'top',
        duration: null,
        render: () => (
          <Box color='white' p={3} bg='green.500' borderRadius='15px'>
            <Text textAlign='center'>Product added successfully</Text>
            <Text textAlign='center'>Click buttons to contiinue</Text>
            <Stack mt='2'>
              <Button color='black' as='a' href='/cart'>Go to cart</Button>
              <Button color='black' as='a' href='/products'>Continue with shopping</Button>
            </Stack>
          </Box>

        ),
      });
    }
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
        showError(err);
      },
    );
  }, [userState, setState, session]);
  return (
    <Button
      hidden={userState || !session ? true : undefined}
      onClick={handleClick}
    >
      Add to Cart
    </Button>
  );
};
export default addCart;
