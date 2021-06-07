import Product from '@models/product';
// import ProductDetailStyles from '@styles/ProductDetail.module.css';
import React from 'react';
import { Box, Image, VStack } from '@chakra-ui/react';
import { Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ProductDetail = (prop: { product: Product }) => {
  const { product } = prop;
  return (
    <div>

      <Box>
        <Flex>
          <Button as="a" href="/products" marginLeft="2.5" marginRight="10" leftIcon={<ArrowBackIcon />}>back</Button>
          <Image src={product.image} alt={product.name} w="600" h="300" marginRight="50px" />
          <VStack>
            <Heading as="h2">
              {product.name}
            </Heading>
            <p>
              {product.description}
            </p>
          </VStack>
          <VStack marginLeft="100">
            <p>
              Price:
              {product.price}
            </p>
            <Button>Add to Cart</Button>
          </VStack>
        </Flex>
      </Box>
    </div>
  );
};

export default ProductDetail;
