import React from 'react';
import {
  Flex, Icon, Text, Spacer, Button, LinkOverlay,
} from '@chakra-ui/react';
import { FaShoppingBag, FaShoppingCart } from 'react-icons/fa';

const NoItemInCart = () => (
  <Flex
    direction='column'
    maxWidth='400px'
  >
    <Flex
      padding='1em'
      justifyContent='center'
      alignItems='center'
    >
      <Icon
        as={FaShoppingCart}
        color='gray.300'
        width='80%'
        height='80%'
      />
    </Flex>
    <Flex
      padding='1em'>
      <Text
        fontSize="lg"
        color='gray.500'
        align='center'
      >
        Your cart is empty! Let's continue your shopping by click the link below
      </Text>
    </Flex>
    <Flex
      padding='1em'
      justifyContent='center'
    >
      <Button
        as='a'
        href='/products'

        leftIcon={<FaShoppingBag />}
        variant='solid'
        backgroundColor='red.400'
        color='white'
        _hover={{
          backgroundColor: 'red.500',
        }}
      >
        Continue your shopping
      </Button>
    </Flex>
  </Flex >
);

export default NoItemInCart;
