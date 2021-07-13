import Link from 'next/link';
import { Models } from 'utilities-techsweave';
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { Box, Image, Stack } from '@chakra-ui/react';

const CarouselItem = (prop: { product: Models.Tables.IProduct }) => {
  const { product } = prop;
  const DiscountPrice = (product.price * ((100 - product.discount!) / 100)).toFixed(2);
  return (
    <Box as="button" w='100%'>
      <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
        <Stack position='relative'>
          <Image src={product.imageURL} fallbackSrc='/images/fallback.png' alt={product.title} w="100%" h={['300px', '300px', '600px', '600px']} borderRadius="15px" fit="cover" />
          <Text position='absolute' top='0' right='5' fontWeight='bold' color='red.500' fontSize='4xl'>
            {product.discount}
            %
          </Text>
          <Stack position='absolute' bottom='0' bg='rgba(44,44,44,0.7)' textColor='white' w='100%' h={['25%', '25%', '40%', '40%']} borderBottomRadius='15px' justifyContent='center'>
            <Text fontWeight='bold' fontSize='1.5em' overflow='hidden'>{product.title}</Text>
            <Stack direction='row' alignSelf='center'>
              <Text>
                {DiscountPrice}
                {' '}
                €
              </Text>
              <Text as='del'>
                {product.price.toFixed(2)}
                {' '}
                €
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
};
export default CarouselItem;
