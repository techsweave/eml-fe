import Link from 'next/link';
import { Models } from 'utilities-techsweave';
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { Box, Image, Stack } from '@chakra-ui/react';

const ProductItem = (prop: { product: Models.Tables.IProduct }) => {
  const { product } = prop;
  return (
    <Box as="button" w='100%'>
      <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
        <Stack position='relative'>
          <Image src={product.imageURL} fallbackSrc="/images/fallback.png" alt={product.title} w="100%" h='300px' borderRadius="15px" fit="cover" />
          <Stack position='absolute' bottom='0' bg='rgba(44,44,44,0.7)' textColor='white' w='100%' h={['25%', '25%', '40%', '40%']} borderBottomRadius='15px' justifyContent='center'>
            <Text fontWeight='bold' fontSize='1.5em' overflow='hidden'>{product.title}</Text>
            <Text>
              price:
              {product.price}
              €
            </Text>
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
};
export default ProductItem;
