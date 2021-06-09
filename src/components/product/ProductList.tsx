import ProductItem from '@components/product/ProductItem';
import Product from '@models/product';
import React, { useState } from 'react';
import { Flex, useMediaQuery, Stack } from '@chakra-ui/react';

const ProductList = (prop: { productList: Product[] }) => {
  const { productList } = prop;
  const [isNotPhoneSize] = useMediaQuery('(min-width:600px)');

  return (
    <Flex w="100%" direction={isNotPhoneSize ? 'row' : 'column'} justifyContent={isNotPhoneSize ? 'space-between' : 'center'} alignItems="center">
      <Stack>
        {productList.map((products) => (
          <ProductItem
            product={products}
            key={products.id}
          />
        ))}
      </Stack>

    </Flex>
  );
};

export default ProductList;
