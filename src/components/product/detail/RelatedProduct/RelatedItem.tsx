import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/layout';
import { Box, Image, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { AuthenticatedUser } from 'utilities-techsweave';

const ProductItem = (prop) => {
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
  const discountedPrice = (product.price * ((100 - product.discount!) / 100));
  return (
    <Box as="button" w='100%'>
      <Link href={{ pathname: userState ? '/editProduct/[id]' : '/products/detail/[id]', query: { id: product.id } }}>
        <Stack position='relative'>
          <Image src={product.imageURL} fallbackSrc="/images/fallback.png" alt={product.title} w="100%" h='150px' borderRadius="15px" fit="scale-down" />
          <Stack position='absolute' bottom='0' bg='rgba(44,44,44,0.7)' textColor='white' w='100%' h='40%' borderBottomRadius='15px' justifyContent='center'>
            <Text fontWeight='bold' fontSize='1.5em' isTruncated ml='3' mr='3'>{product.title}</Text>
            <Stack direction='row' alignItems='center' alignSelf='center'>
              <Text>
                {(product.discount ? discountedPrice : product.price)?.toFixed(2).toString().concat(' €')}
              </Text>
              <Text
                as='del'
              >
                {product.discount ? product.price?.toFixed(2).toString().concat('€') : undefined}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
};
export default ProductItem;
