import { Models } from 'utilities-techsweave';
import React from 'react';
import {
  useToast, Box, Button, Text, Stack,
} from '@chakra-ui/react';
import axios from 'axios';

const addCart = (prop: { product: Models.Tables.IProduct, quantity: number }) => {
  const toast = useToast();
  const { product, quantity } = prop;
  const qty = quantity >= product.availabilityQta! ? product.availabilityQta! : quantity;

  const handleClick = async () => {
    let result;
    let axiosResponse;
    try {
      try {
        axiosResponse = await axios.request({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`,
          method: 'POST',
          data: {
            productsIds: product.id,
            quantity: qty,
          },
        });
      } catch (err) {
        if (err.response) {
          throw err.response.data;
        } else if (err.request) {
          throw err.request;
        } else {
          throw err;
        }
      }
      result = axiosResponse.data;
    } catch (error) {
      toast({
        title: error.error.name,
        description: error.error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      });
    }
    if (result.productId === product.id) {
      toast({
        position: 'top',
        duration: null,
        render: () => (
          <Box color='white' p={3} bg='green.500' borderRadius='15px'>
            <Text textAlign='center'>Product added successfully</Text>
            <Text textAlign='center'>Click buttons to continue</Text>
            <Stack mt='2'>
              <Button color='black' as='a' href='/cart'>Go to cart</Button>
              <Button color='black' as='a' href='/products'>Continue with shopping</Button>
            </Stack>
          </Box>

        ),
      });
    }
  };
  return (
    <Button
      onClick={handleClick}
    >
      Add to Cart
    </Button>
  );
};
export default addCart;
