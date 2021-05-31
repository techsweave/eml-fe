// import productStyles from '@styles/Product.module.css';
import Link from 'next/link';
import Product from '@models/product';
import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';

const ProductItem = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
      <Box as="button" border="1px" rounded="md" p="5px" bg="gray.100">
        <Heading as="h4">{product.name}</Heading>
        <p>
          price:
          {product.price}
          €
        </p>
        <p>{product.description}</p>
      </Box>
    </Link>
  );
};

export default ProductItem;
