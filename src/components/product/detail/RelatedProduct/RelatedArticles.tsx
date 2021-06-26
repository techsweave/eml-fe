import React from 'react';
import {
  Box, Grid, GridItem, Heading,
} from '@chakra-ui/react';
import RelatedItem from '@components/product/detail/RelatedProduct/RelatedItem';
import { Models } from 'utilities-techsweave';

const RelatedProducts = (prop: { product: Models.Tables.IProduct[] }) => {
  const { product } = prop;
  return (
    <Box>
      <Heading textAlign='center' m='10'>Related Product</Heading>
      <Grid templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(6, 1fr)', 'repeat(6, 1fr)']} gap={10} ml={['5', '5', '10', '10']} mr={['5', '5', '10', '10']}>
        {product.map((products) => (
          <GridItem
            key={products.id}
          >
            <RelatedItem
              product={products}
              key={products.id}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
export default RelatedProducts;
