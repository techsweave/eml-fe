import Product from '@models/product';
import React from 'react';
import { Image, useMediaQuery, VStack } from '@chakra-ui/react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ProductDetail = (prop: { product: Product }) => {
  const { product } = prop;
  const [isNotPhoneSize] = useMediaQuery('(min-width:600px)');
  return (

    <Flex w="90%" direction={isNotPhoneSize ? 'row' : 'column'} mr="50">
      <Button as="a" href="/products" ml="2.5" mb={isNotPhoneSize ? '0' : '5'} size="sm" leftIcon={<ArrowBackIcon />}>back</Button>
      <Image src={product.image} alt={product.name} w="500px" h="250px" borderRadius="base" />
      <VStack flexBasis="50%" alignSelf="center">
        <Heading as="h2">
          {product.name}
        </Heading>
        <p>
          {product.description}
        </p>
      </VStack>
      <VStack mr={isNotPhoneSize ? '10' : '0'}>
        <p>
          Price:
          {product.price}
        </p>
        <Button>Add to Cart</Button>
      </VStack>
    </Flex>
  );
};

export default ProductDetail;
