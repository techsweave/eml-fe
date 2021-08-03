import Link from 'next/link';
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { Box, Image, Stack } from '@chakra-ui/react';

const ProductItem = (prop) => {
  const { product } = prop;
  const discountedPrice = (product.price * ((100 - product.discount!) / 100));
  return (
    <Box as="button" w='100%'>
      <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
        <Stack position='relative'>
          <Image src={product.imageURL} fallbackSrc="/images/fallback.png" alt={product.title} w="100%" h='150px' borderRadius="15px" fit="scale-down" />
          <Stack position='absolute' bottom='0' bg='rgba(44,44,44,0.7)' textColor='white' w='100%' h='40%' borderBottomRadius='15px' justifyContent='center'>
            <Text fontWeight='bold' fontSize='1.5em' overflow='hidden'>{product.title}</Text>
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
