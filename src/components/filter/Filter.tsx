import { Radio, RadioGroup } from '@chakra-ui/radio';
import { HStack, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import React from 'react';
import {
  FormControl, FormLabel, Menu, MenuButton, MenuList, Box
} from '@chakra-ui/react';
import { VscChevronDown } from 'react-icons/vsc';

const Filter = () => {
  const [value, setValue] = React.useState('0');
  const handleChange = (event) => {
    console.log(value);
  };
  return (
    <Box>
      <FormControl  h='100%' display={['none', 'none', 'none', 'inherit']} onSubmit={handleChange} flexBasis='20%' p='5' bg='gray.100' border='1px' borderRadius='15px' borderColor='e06771' alignItems='center'>
        <FormLabel>Lowest Price</FormLabel>
        <RadioGroup name="lowestPrice" onChange={setValue} value={value}>
          <Stack>
            <Radio id="50" value="50" checked={value === '50'}>50</Radio>
            <Radio id="100" value="100" checked={value === '100'}>100</Radio>
            <Radio id="150" value="150" checked={value === '150'}>150</Radio>
          </Stack>
        </RadioGroup>
        <FormLabel>Highest Price</FormLabel>
        <RadioGroup name="lowestPrice" onChange={setValue} value={value}>
          <Stack>
            <Radio id="200" value="200" checked={value === '200'}>200</Radio>
            <Radio id="250" value="250" checked={value === '250'}>250</Radio>
            <Radio id="300" value="300" checked={value === '300'}>300</Radio>
          </Stack>
        </RadioGroup>
        <Button onClick={handleChange}>Apply filter</Button>
      </FormControl>
      <Stack display={['inherit', 'inherit', 'none', 'none']}>
      <Menu>
        <MenuButton as={Button} rightIcon={<VscChevronDown />}>Filter</MenuButton>
        <MenuList >
          <FormControl onSubmit={handleChange} flexBasis='20%' h="auto" p='5' bg='gray.100' border='1px' borderRadius='15px' borderColor='e06771' alignItems='center'>
            <FormLabel>Lowest Price</FormLabel>
            <RadioGroup name="lowestPrice" onChange={setValue} value={value}>
              <Stack>
                <Radio id="50" value="50" checked={value === '50'}>50</Radio>
                <Radio id="100" value="100" checked={value === '100'}>100</Radio>
                <Radio id="150" value="150" checked={value === '150'}>150</Radio>
              </Stack>
            </RadioGroup>
            <FormLabel>Highest Price</FormLabel>
            <RadioGroup name="lowestPrice" onChange={setValue} value={value}>
              <Stack>
                <Radio id="200" value="200" checked={value === '200'}>200</Radio>
                <Radio id="250" value="250" checked={value === '250'}>250</Radio>
                <Radio id="300" value="300" checked={value === '300'}>300</Radio>
              </Stack>
            </RadioGroup>
            <Button onClick={handleChange}>Apply filter</Button>
          </FormControl>
        </MenuList>
        </Menu>
        </Stack>
    </Box>
  );
};

export default Filter;