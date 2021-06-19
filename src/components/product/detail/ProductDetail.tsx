import { Models } from 'utilities-techsweave';
import React from 'react';
import { Image, VStack } from '@chakra-ui/react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ProductDetail = (prop: { product: Models.Tables.IProduct }) => {
  const { product } = prop;
  return (
    <Flex w="95%" direction={['column', 'column', 'row', 'row']} alignSelf="center">
      <Button as="a" href="/products" ml={['0', '0', '2,5', '2,5']} mb={['5', '5', '0', '0']} w="100px" mr={['0', '0', '20', '20']} leftIcon={<ArrowBackIcon />} bg='gray.100'>back</Button>
      <Image src={product.imageURL} fallbackSrc='/images/fallback.png' alt={product.title} w="500px" h="300px" borderRadius="15px" fit='scale-down' />
      <VStack flexBasis="50%" alignSelf="center">
        <Heading as="h2">
          {product.title}
        </Heading>
        <p>
          {product.description}
        </p>
      </VStack>
      <VStack ml={['0', '0', '10', '10']} alignSelf="center">
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
