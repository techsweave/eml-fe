import ProductItem from '@components/product/ProductItem';
import Product from '@models/product';
import React, { useState } from 'react';
import { Flex, Box, VStack } from '@chakra-ui/react';

const ProductList = (prop: { productList: Product[] }) => {
  const { productList } = prop;

  return (
    <VStack>
      <Flex w="100%" direction={['column', 'column', 'row', 'row']} justifyContent='center'>
        <Box>
          {productList.map((products) => (
            <ProductItem
              product={products}
              key={products.id}
            />
          ))}
        </Box>
      </Flex>
    </VStack>
  );
};

export default ProductList;
