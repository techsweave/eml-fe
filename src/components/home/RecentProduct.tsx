import React from 'react';
import {
  Box, Grid, Heading, GridItem,
} from '@chakra-ui/react';
import { Models } from 'utilities-techsweave';
import ProductItem from '@components/product/ProductItem';

const RecentProduct = (prop: { product: Models.Tables.IProduct[] }) => {
  const { product } = prop;
  return (
    <Box>
      <Heading textAlign='center' m='10'>Recent Product</Heading>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={20}>
        {product.map((products) => (
          <GridItem
            key={products.id}
            tag="li"
            style={{ listStyle: 'none' }}
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
};
export default RecentProduct;
