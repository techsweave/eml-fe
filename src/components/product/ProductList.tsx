import ProductItem from '@components/product/ProductItem';
import { Models } from 'utilities-techsweave';
import React from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';

const ProductList = (prop: { productList: Models.Tables.IProduct[] }) => {
  const { productList } = prop;

  return (
    <Box>
      <Grid ml={['0', '0', '50', '50']} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={10}>
        {productList.map((products) => (
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

export default ProductList;
