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
        product.customSpecs?.map((item) => (
          <GridItem key={item.fieldName} borderBottom='1px' borderTop='1px' p='2' borderBottomColor='gray.300' borderTopColor='gray.300'>
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
        ))
      }
    </Grid>
  );
};
export default productInfo;
