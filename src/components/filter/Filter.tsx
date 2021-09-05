import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Flex, HStack, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import React, { useEffect } from 'react';
import { MdGraphicEq } from 'react-icons/md'
import {
  FormControl, Text, Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Link, Select, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper
} from '@chakra-ui/react';
import { VscChevronDown } from 'react-icons/vsc';
import { Models, Services } from 'utilities-techsweave';

const Filter = (prop: { minProp: string, maxProp: string, categoryProp: string }) => {
  let minProp: number = prop.minProp ? +prop.minProp / 5 : 0;
  let maxProp: number = prop.maxProp ? +prop.maxProp / 10 : 100;
  const [min, setMin] = React.useState<string>(minProp.toString());
  const [max, setMax] = React.useState<string>(maxProp.toString());
  const minValue: number | undefined = +min ? +min * 5 : 0;
  const maxValue: number | undefined = +max ? +max * 10 : 1000;

  const [categoryName, setCategoryName] = React.useState<string>("");
  const [categoryId, setCategoryId] = React.useState<string>(prop.categoryProp ?? "");

  const [categories, setCategories] = React.useState<Array<Models.Tables.ICategory>>();

  const [isLoading, setLoading] = React.useState<boolean>(true);
  //const handleMinChange = (value) => setMin(value)

  async function scanCategories() {
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
    );
    const caller = new Services.Categories(
      productService,
      process.env.NEXT_PUBLIC_API_ID_CATEGORIES as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
    );
    return caller.scanAsync(1000);
  }

  useEffect(() => {
    if (!isLoading) return
    if (categories) return
    scanCategories().then((data) => {
      console.log(data.data)
      setCategories(data.data)
    })
    setLoading(false)
  }, [isLoading, setLoading, categories, setCategories]);


  const handleMinChange = (value) => {
    if (value >= +max * 2) {
      setMin((+max * 2 - 1).toString())
    } else {
      setMin(value)
    }
  }
  const handleMaxChange = (value) => {
    if (value <= +min / 2) {
      setMax((+min / 2 + 1).toString())
    } else {
      setMax(value)
    }
  }

  const handleCategoryChange = (e) => {
    const cat = categories?.find((x) => x.name == e.target.value)
    setCategoryId(cat?.id as string);
    setCategoryName(cat?.name as string);
  }

  if (!isLoading)
    return (
      <Box>
        <FormControl h='100%' flexBasis='20%' p='5' bg='gray.100' borderRadius='15px' alignItems='center'>
          <Flex id='min'>
            <Text fontWeight='bold' mr='5'>Min Price</Text>
            <Slider flex="1" focusThumbOnChange={false} value={minValue ? minValue / 5 : 0} onChange={handleMinChange}>
              <SliderTrack >
                <SliderFilledTrack bg='#e06771' />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={minValue} />
            </Slider>
          </Flex>
          <Flex id='max' mt='2'>
            <Text fontWeight='bold' mr='5'>Max Price</Text>
            <Slider flex="1" focusThumbOnChange={false} value={maxValue ? maxValue / 10 : 1000} onChange={handleMaxChange}>
              <SliderTrack>
                <SliderFilledTrack bg='#e06771' />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={maxValue} />
            </Slider>
          </Flex>
          <Flex id="cat" mt="2">
            <Text fontWeight='bold' mr='5' mt="1">Category</Text>
            <Select placeholder="Select a category" id={categoryId} value={categoryName} onChange={handleCategoryChange}>
              {categories?.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </Select>
          </Flex>
          <Link mt="1" href={
            `products?${minValue ? 'filterMin=' + minValue + '&' : ""}${maxValue ? 'filterMax=' + maxValue + '&' : ''}${categoryId ? 'categoryId=' + categoryId : ''}`
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
  else
    return (
      <p></p>
    )
};

export default Filter;
