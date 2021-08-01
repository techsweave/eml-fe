import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import handleChange from '../../../libs/handleSelectedproducts';

const SelectedItem = (prop: { productid: string }) => {
  const { productid } = prop;
  return (
    <Checkbox value={productid} onChange={handleChange} borderColor='red.500' mr='55%' mt='2'>Select item</Checkbox>
  );
};
export default SelectedItem;
