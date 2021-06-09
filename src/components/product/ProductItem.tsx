// import productStyles from '@styles/Product.module.css';
import Link from 'next/link';
import Product from '@models/product';
import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box, Image, Stack } from '@chakra-ui/react';

const ProductItem = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
      <Box as="button" rounded="md" p="5px" w="500px">
        <Stack>
          <Image src={product.image} alt={product.name} w="100%" h="300px" alignSelf="center" />
          <Heading as="h4">{product.name}</Heading>
          <p>
            price:
            {product.price}
            €
          </p>
        </Stack>
      </Box>
    </Link>
  );
};

export default ProductItem;
