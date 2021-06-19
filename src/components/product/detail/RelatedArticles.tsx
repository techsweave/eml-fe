import React from 'react';
import {
  Box, Grid, GridItem, Heading,
} from '@chakra-ui/react';
import ProductItem from '@components/product/ProductItem';
import { Models } from 'utilities-techsweave';

const RelatedProducts = (prop: { product: Models.Tables.IProduct[] }) => {
  const { product } = prop;
  return (
    <Box>
      <Heading textAlign='center' m='10'>Related Product</Heading>
      <Grid templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(6, 1fr)', 'repeat(6, 1fr)']} gap={10} ml='10' mr='10'>
        {product.map((products) => (
          <GridItem
            id={products.id}
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
export default RelatedProducts;
