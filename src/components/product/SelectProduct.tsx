import React from 'react';
import { Checkbox } from '@chakra-ui/react';

const selectedProduct = (prop: { productid: string }) => {
  const { productid } = prop;
  const handleChange = () => {
    const a = 2;
    console.log(a);
  };
  return (
    <Checkbox value={productid} onChange={handleChange} borderColor='red.500' mr='55%' mt='2'>Select item</Checkbox>
  );
};
export default selectedProduct;
