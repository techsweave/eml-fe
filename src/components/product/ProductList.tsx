import { Models, Services } from 'utilities-techsweave';
import React from 'react';
import {
  Grid, GridItem, Box, Heading, Checkbox, Button, useToast, Center, Stack, Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import ProductItem from './ProductItem';

const ProductList = (prop: { productList: Models.Tables.IProduct[], vendor: boolean }) => {
  const { productList, vendor } = prop;
  const arrayID: string[] = [];
  const session = useSession()[0];
  const toast = useToast();

  const handleChange = (e) => {
    if (e.target.checked) {
      arrayID.push(e.target.value);
    } else {
      for (let i = 0; i < arrayID.length; i += 1) {
        if (arrayID[i] === e.target.value) {
          arrayID.splice(i, 1);
        }
      }
    }
  };
  const submit = async () => {
    const cartService = new Services.Carts(
      process.env.NEXT_PUBLIC_API_ID_CART!,
      process.env.NEXT_PUBLIC_API_REGION!,
      process.env.NEXT_PUBLIC_API_STAGE!,
      session?.accessToken as string,
      session?.idToken as string,
    );
    try {
      arrayID.forEach(async (x) => {
        await cartService.addProductAsync(x, 1);
      });
    } catch (error) {
      toast({
        title: error.name,
        description: error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      });
    }
    toast({
      position: 'top',
      duration: null,
      render: () => (
        <Box color='white' p={3} bg='green.500' borderRadius='15px'>
          <Text textAlign='center'>Products added successfully</Text>
          <Text textAlign='center'>Click buttons to contiinue</Text>
          <Stack mt='2'>
            <Button color='black' as='a' href='/cart'>Go to cart</Button>
            <Button color='black' as='a' href='/products'>Continue with shopping</Button>
          </Stack>
        </Box>

      ),
    });
  };
  if (productList.length !== 0) {
    return (
      <Box p='5'>
        <Center><Button mb='5' hidden={vendor} onClick={submit}>Add selected products to Cart</Button></Center>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={10}>
          {productList.map((products) => (
            <GridItem
              key={products.id}
            >
              <Checkbox m='2' value={products.id} hidden={vendor} onChange={handleChange} colorScheme="red" mr='55%' mt='2'>Select product</Checkbox>
              <ProductItem
                product={products}
                key={products.id}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  }
  return (
    <Box alignContent='center' p='5'>
      <Heading textAlign='center'>No products found</Heading>
    </Box>
  );
};

export default ProductList;
