import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Flex, HStack, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import React from 'react';
import { MdGraphicEq } from 'react-icons/md'
import {
    FormControl, Text, FormLabel, Menu, MenuButton, MenuList, Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper
} from '@chakra-ui/react';
import { VscChevronDown } from 'react-icons/vsc';

const Filter = (prop: { minProp: string, maxProp: string }) => {
    let minProp: number = prop.minProp ? +prop.minProp / 5 : 0;
    let maxProp: number = +prop.maxProp / 10;
    const [min, setMin] = React.useState<string>(minProp.toString());
    const [max, setMax] = React.useState<string>(maxProp.toString());
    const minValue: number | undefined = +min ? +min * 5 : undefined;
    const maxValue: number | undefined = +max ? +max * 10 : undefined;
    const handleMinChange = (value) => setMin(value)
    const handleMaxChange = (value) => {
    if (value <= +min / 2) {
      setMax((+min / 2 + 1).toString())
    } else {
      setMax(value)
    }
  }
    return (
        <Box>
            <FormControl h='100%' flexBasis='20%' p='5' bg='gray.100' borderRadius='15px' alignItems='center'>
                <Flex id='min'>
                    <Text fontWeight='bold' mr='5'>Min Price</Text>
            <Slider flex="1" focusThumbOnChange={false} value={minValue ? minValue / 5 : 0}  onChange={handleMinChange}>
                        <SliderTrack >
                            <SliderFilledTrack bg='#e06771' />
                        </SliderTrack>
                        <SliderThumb fontSize="sm" boxSize="32px" children={minValue} />
                    </Slider>
                </Flex>
                <Flex id='max' mt='2'>
                    <Text fontWeight='bold' mr='5'>Max Price</Text>
            <Slider flex="1" focusThumbOnChange={false} value={maxValue ? maxValue / 10 : undefined} onChange={handleMaxChange}>
                        <SliderTrack>
                            <SliderFilledTrack bg='#e06771' />
                        </SliderTrack>
                        <SliderThumb fontSize="sm" boxSize="32px" children={maxValue} />
                    </Slider>
                </Flex>
                <Link href={
                    minValue && maxValue ?
                        'products?filterMin=' + minValue + '&filterMax=' + maxValue :
                        minValue && !maxValue ?
                            'products?filterMin=' + minValue :
                            !minValue && maxValue ?
                                'products?filterMax=' + maxValue :
                                'products'
                }
                >
                    <Button>Apply filter</Button>
                </Link>
                <Link href='/products'>
                    <Button>Reset filter</Button>
                </Link>
            </FormControl>
        </Box >
    );
};

export default Filter;
