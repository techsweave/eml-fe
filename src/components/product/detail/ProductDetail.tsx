import { Models, Services, AuthenticatedUser } from 'utilities-techsweave';
import React, { useState, useEffect } from 'react';
import { Image, VStack } from '@chakra-ui/react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/client';

const ProductDetail = (prop: { product: Models.Tables.IProduct }) => {
  const { product } = prop;
  const session = useSession()[0];
  const [userState, setState] = useState<boolean>();

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
  const handleClick = async () => {
    const caller = new Services.Carts(`${process.env.NEXT_PUBLIC_API_ID_CART}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, session?.accessToken as string, session?.idToken as string);
    const addProduct = await caller.addProductAsync(product.id, 1);
  };

  const manageProduct = async () => {
    //TODO
    console.log(2);
  };
  return (
    <Flex w="95%" direction={['column', 'column', 'row', 'row']} alignSelf="center">
      <Button as="a" href="/products" ml={['0', '0', '2,5', '2,5']} mb={['5', '5', '0', '0']} w="100px" mr={['0', '0', '20', '20']} leftIcon={<ArrowBackIcon />} bg='gray.100'>back</Button>
      <Image src={product.imageURL} fallbackSrc='/images/fallback.png' alt={product.title} w="500px" h="300px" borderRadius="15px" fit='scale-down' />
      <VStack flexBasis="50%" alignSelf="center">
        <Heading as="h2">
          {product.title}
        </Heading>
        <p>
          {product.description}
        </p>
      </VStack>
      <VStack ml={['0', '0', '10', '10']} alignSelf="center">
        <p>
          Price:
          {product.price}
        </p>
        <Button hidden={userState ? true : undefined} onClick={handleClick}>Add to Cart</Button>
        <Button hidden={!userState ? true : undefined} onClick={manageProduct}>Edit product</Button>
      </VStack>
    </Flex>
  );
};

export default ProductDetail;
