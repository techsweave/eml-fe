import { Radio, RadioGroup } from '@chakra-ui/radio';
import { HStack, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import React from 'react';
import { MdGraphicEq } from 'react-icons/md'
import {
    FormControl, FormLabel, Menu, MenuButton, MenuList, Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Link
} from '@chakra-ui/react';
import { VscChevronDown } from 'react-icons/vsc';


const Filter = () => {
    const [min, setMin] = React.useState<string>();
    const [max, setMax] = React.useState<string>();
    const resetFilter = () => {
        setMin(undefined);
        setMax(undefined);
    }
    return (
        <Box>
            <FormControl h='100%' display={['none', 'none', 'inherit', 'inherit']} flexBasis='20%' p='5' bg='gray.100' border='1px' borderRadius='15px' borderColor='e06771' alignItems='center'>
                <FormLabel>Min Price</FormLabel>
                <RadioGroup id='min' name="minPrice" onChange={setMin} value={min}>
                    <Stack>
                        <Radio id="50" value="50" checked={min === '50'}>50</Radio>
                        <Radio id="100" value="100" checked={min === '100'}>100</Radio>
                        <Radio id="150" value="150" checked={min === '150'}>150</Radio>
                    </Stack>
                </RadioGroup>
                <FormLabel>Max Price</FormLabel>
                <RadioGroup id='max' name="minPrice" onChange={setMax} value={max}>
                    <Stack>
                        <Radio id="200" value="200" checked={max === '200'}>200</Radio>
                        <Radio id="250" value="250" checked={max === '250'}>250</Radio>
                        <Radio id="300" value="300" checked={max === '300'}>300</Radio>
                    </Stack>
                </RadioGroup>
                <Link href={
                    min && max ?
                        'products?filterMin=' + min + '&filterMax=' + max :
                        min && !max ?
                            'products?filterMin=' + min :
                            !min && max ?
                                'products?filterMax=' + max :
                                'products'
                }
                >
                    <Button>Apply filter</Button>
                </Link>
                <Link href='/products'>
                    <Button>Reset filter</Button>
                </Link>
            </FormControl>
            <Stack display={['inherit', 'inherit', 'none', 'none']}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<VscChevronDown />}>Filter</MenuButton>
                    <MenuList >
                        <FormControl flexBasis='20%' h="auto" p='5' bg='gray.100' border='1px' borderRadius='15px' borderColor='e06771' alignItems='center'>
                            <FormLabel>Min Price</FormLabel>
                            <RadioGroup id='min' name="lowestPrice" onChange={setMin} value={min}>
                                <Stack>
                                    <Radio id="50" value="50" checked={min === '50'}>50</Radio>
                                    <Radio id="100" value="100" checked={min === '100'}>100</Radio>
                                    <Radio id="150" value="150" checked={min === '150'}>150</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel>Max Price</FormLabel>
                            <RadioGroup id='max' name="lowestPrice" onChange={setMax} value={max}>
                                <Stack>
                                    <Radio id="200" value="200" checked={max === '200'}>200</Radio>
                                    <Radio id="250" value="250" checked={max === '250'}>250</Radio>
                                    <Radio id="300" value="300" checked={max === '300'}>300</Radio>
                                </Stack>
                            </RadioGroup>
                            <Link href={
                                min && max ?
                                    'products?filterMin=' + min + '&filterMax=' + max :
                                    min && !max ?
                                        'products?filterMin=' + min :
                                        !min && max ?
                                            'products?filterMax=' + max :
                                            'products'
                            }
                            >
                                <Button>Apply filter</Button>
                            </Link>
                            <Link href='/products'>
                                <Button>Reset filter</Button>
                            </Link>
                        </FormControl>
                    </MenuList>
                </Menu>
            </Stack>
        </Box >
    );
};

export default Filter;
