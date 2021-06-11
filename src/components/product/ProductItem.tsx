// import productStyles from '@styles/Product.module.css';
import Link from 'next/link';
import Product from '@models/product';
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { Box, Image, Stack } from '@chakra-ui/react';

const ProductItem = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <Box as="button" w={['100%', '100%', '20%', '20%']} ml={['0', '0', '10', '10']} mt={['10', '10', '5', '5']}>
      <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
        <Stack position='relative'>
          <Image src={product.image} alt={product.name} w="100%" h={['300px', '300px', '150px', '150px']} borderRadius="15px" fit="cover" />
          <Stack position='absolute' bottom='0' bg='rgba(44,44,44,0.7)' textColor='white' w='100%' h={['25%', '25%', '40%', '40%']} borderBottomRadius='15px'>
            <Text fontWeight='bold' fontSize='1.5em' overflow='hidden'>{product.name}</Text>
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
