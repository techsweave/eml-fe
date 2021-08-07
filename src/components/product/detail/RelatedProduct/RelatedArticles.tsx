import React from 'react';
import {
  Box, Grid, GridItem, Heading, Text,
} from '@chakra-ui/react';
import { Models } from 'utilities-techsweave';
import RelatedItem from './RelatedItem';

const RelatedProducts = (prop:{ product:Models.Tables.IProduct[] }) => {
  const { product } = prop;
  return (
    <Box mt='5'>
      <Heading mt='10' mb='10'>Alternative Product</Heading>
      {product.length === 0 && (<Text textAlign='center' fontSize='3xl'>There is no products corrisponding with this category</Text>)}
      {product.length !== 0 && (
      <Grid templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(6, 1fr)', 'repeat(6, 1fr)']} gap={10} ml={['5', '5', '0', '0']} mr={['5', '5', '10', '10']}>
        {product.map((products) => (
          <GridItem
            key={products.id}
          >
            <RelatedItem
              product={products}
            />
          </GridItem>
        ))}
      </Grid>
      )}
    </Box>
  );
};
export default RelatedProducts;
