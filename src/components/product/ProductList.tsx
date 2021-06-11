import ProductItem from '@components/product/ProductItem';
import { Models } from 'utilities-techsweave';
import React, { useState } from 'react';
import { Flex, Box, VStack } from '@chakra-ui/react';

const ProductList = (prop: { productList: Models.Tables.IProduct[] }) => {
  const { productList } = prop;

  return (
    <VStack>
      <Flex direction={['column', 'column', 'row', 'row']}>
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
