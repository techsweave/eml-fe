import ProductItem from '@components/product/ProductItem';
import { Models } from 'utilities-techsweave';
import React from 'react';
import {
  Grid, GridItem, Box, Heading,
} from '@chakra-ui/react';

const ProductList = (prop: { productList: Models.Tables.IProduct[] }) => {
  const { productList } = prop;
  if (productList.length !== 0) {
    return (
      <Box p='5'>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={10}>
          {productList.map((products) => (
            <GridItem
              key={products.id}
            >
              <ProductItem
                product={products}
                key={products.id}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  }
  return (
    <Box alignContent='center' p='5'>
      <Heading textAlign='center'>No products found with the filters selected</Heading>
    </Box>
  );
};

export default ProductList;
