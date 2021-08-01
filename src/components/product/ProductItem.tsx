import Link from 'next/link';
import { Models } from 'utilities-techsweave';
import React from 'react';
import { Text } from '@chakra-ui/layout';
import {
  Box, Image, Stack,
} from '@chakra-ui/react';

const ProductItem = (prop: { product: Models.Tables.IProduct }) => {
  const { product } = prop;
  const discountedPrice = (product.price * ((100 - product.discount!) / 100));
  return (
    <Box as="button" w='100%' border='1px' borderColor='gray.100' borderRadius="15px">
      <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
        <Stack position='relative'>
          <Image src={product.imageURL} fallbackSrc="/images/fallback.png" alt={product.title} w="100%" h='300px' borderRadius="15px" fit="scale-down" />
          <Stack pl='4' pr='4' position='absolute' bottom='0' bg={product.isSalable === undefined /* customer */ || product.isSalable === true /* vendor */ ? 'rgba(44,44,44,0.7)' : 'rgba(200,0,0,0.7)'} textColor='white' w='100%' h={['25%', '25%', '40%', '40%']} borderBottomRadius='15px' justifyContent='center'>
            <Text fontWeight='bold' fontSize='1.5em' isTruncated>{product.title}</Text>
            <Stack direction='row' alignItems='center' alignSelf='center'>
              <Text
                fontSize='xl'
              >
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
