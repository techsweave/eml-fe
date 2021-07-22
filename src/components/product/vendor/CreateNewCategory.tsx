import { useSession } from 'next-auth/client';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Box,
  Text,
  HStack,
  Grid,
  GridItem,
  useToast,
  Center,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import * as AWS from 'aws-sdk';
import { Services, Models } from 'utilities-techsweave';
import showError from '@libs/showError';

function CreateNew() {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });

  const session = useSession()[0];
  const [category, setCategory] = useState<Models.Tables.INewCategory>({
    name: '',
    customSpecTemplates: new Array<Models.Tables.ISpecTemplate>(),
    description: '',
    taxes: 22,
    macroCategorieId: '',
  });
  const toast = useToast();

  const submitForm = async () => {
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      session?.accessToken as string,
      session?.idToken as string,
    );
    const categoriesService = new Services.Categories(
      productService,
      process.env.NEXT_PUBLIC_API_ID_CATEGORIES as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      session?.accessToken as string,
      session?.idToken as string,
    );
    try {
      await categoriesService.createAsync(category);
    } catch (error) {
      showError(error);
    }
    toast({
      position: 'top',
      render: () => (
        <Box color='white' p={3} bg='green.500' borderRadius='15px'>
          <Text textAlign='center'>Creation successfully done</Text>
          <Text textAlign='center'>Click button to continue</Text>
          <Center>
            <Button color='black' as='a' href="/manageShop">Close</Button>
          </Center>
        </Box>

      ),
    });
  };

  const handleChange = (e) => {
    console.log(category);
    let position: number;
    // const specs: Array<Models.Tables.ISpecTemplate> = ;
    if (e.target.name.includes('spec') || e.target.name.includes('misure')) {
      position = +e.target.name.substr(e.target.name.length - 1);

      if (!category.customSpecTemplates![position]) {
        category.customSpecTemplates![position] = {
          fieldName: '',
          unitMisure: '',
        };
      } else if (e.target.name.includes('spec')) {
        category.customSpecTemplates![position].fieldName = e.target.value;
      } else if (e.target.name.includes('misure')) {
        category.customSpecTemplates![position].unitMisure = e.target.value;
      }
    } else if (e.target.name === 'taxes') {
      category.taxes = +e.target.value;
    } else {
      category[e.target.name] = e.target.value;
    }
    setCategory({ ...category });
  };

  const [inputList, setInputList] = useState([]);
  const onAddBtnClick = (event) => {
    if (inputList.length < 15) {
      setInputList(inputList.concat(
        <HStack w='100%' mb='5' key={inputList.length}>
          <Stack w='100%' mr='5'>
            <FormLabel>Spec name</FormLabel>
            <Input name={`spec${inputList.length}`} placeholder='Spec name' onChange={handleChange} />
          </Stack>
          <Stack w='100%'>
            <FormLabel placeholder='Unit misure'>Unit misure</FormLabel>
            <Input name={`misure${inputList.length}`} placeholder='Unit misure' onChange={handleChange} />
          </Stack>
        </HStack>,
      ));
    } else {
      setInputList(inputList.concat(
        <Text>The maximum number of specs for a category is 15</Text>,
      ));
    }
  };
  return (
    <form>
      <FormControl>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']} gap={['1', '5', '10', '50']}>
          <GridItem>
            <FormLabel>Category name</FormLabel>
            <Input name="name" id="name" placeholder="Category name" value={category.name} onChange={handleChange} />

            <FormLabel mt="1%">Category description</FormLabel>
            <Textarea name="description" id="description" placeholder="Category description" value={category.description} onChange={handleChange} />

            <FormLabel mt="1%">Product of this category will have this taxes (%)</FormLabel>
            <Input type='number' name="taxes" id="taxes" precision={2} min={1} value={category.taxes} onChange={handleChange} />

          </GridItem>
          <GridItem>
            {inputList}
            <Button onClick={onAddBtnClick} hidden={!(inputList.length <= 15)}>
              Add new template specification
            </Button>
          </GridItem>
        </Grid>
      </FormControl>

      <Button mt="1%" type="button" name="button" onClick={submitForm} leftIcon={<PlusSquareIcon size={20} alignSelf='center' />}> Submit</Button>
    </form>
  );
}

export default CreateNew;
