// import productStyles from '@styles/Product.module.css';
import Link from 'next/link';
import Product from '@models/product';
import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box, Image, Stack } from '@chakra-ui/react';

const ProductItem = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <Box as="button">
      <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
        <Stack>
          <Image src={product.image} alt={product.name} w="100%" h="300px" borderRadius="15px" fit="cover" />
          <Stack>
            <Heading as="h4">{product.name}</Heading>
            <p>
              price:
              {product.price}
              €
            </p>
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
};
export default ProductItem;
