import React from 'react';
import {
  Grid, GridItem, HStack, Text,
} from '@chakra-ui/react';
import { Models } from 'utilities-techsweave';

const productInfo = (prop: { product: Models.Tables.IProduct }) => {
  const { product } = prop;
  return (
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
      {
        product.customSpecs?.map((item) => {
          if (item.value)
            return (
              <GridItem key={item.fieldName}>
                <HStack>
                  <Text fontWeight='bold'>
                    {item.fieldName}
                    :
                  </Text>
                  <Text>
                    {item.value}
                    {' '}
                    {item.unitMisure}
                  </Text>
                </HStack>
              </GridItem>
            )
        })
      }
    </Grid>
  );
};
export default productInfo;
