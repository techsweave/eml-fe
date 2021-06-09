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
      <Box as="button" rounded="md" p="5px" w="300px">
        <Stack>
          <Image src={product.image} alt={product.name} w="300px" h="150px" />
          <p>{product.name}</p>
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
