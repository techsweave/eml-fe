import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Checkbox,
  Stack,
  Box,
  Text
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import * as AWS from 'aws-sdk';
import { Services, Models, Image } from 'utilities-techsweave';
// const fs = require('fs');
const fs = require('fs');

interface Item {
  label: string;
  value: string;
}

function CreateNew() {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });

  const [state, setState] = useState<Models.Tables.ICategory[]>();
  const session = useSession()[0];
  let categories: Array<Item> = new Array();
  const [category, setCategory] = useState<Models.Tables.ICategory>();

  async function scanCategories(s) {
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      s?.accessToken as string,
      s?.idToken as string,
    );
    const caller = new Services.Categories(
      productService,
      process.env.NEXT_PUBLIC_API_ID_CATEGORIES as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      s?.accessToken as string,
      s?.idToken as string,
    );
    return caller.scanAsync(1000);
  }

  const [formState, setFormState] = useState<Models.Tables.INewProduct>({
    title: '',
    price: 0,
    description: '',
    categorieId: '',
    availabilityQta: 0,
    isSalable: false,
    customSpecs: undefined,
    discount: 0,
    imageURL: '',
    notes: '',
    tags: new Array()
  });

  useEffect(() => {
    const s = session;
    //if (state !== undefined && category !== undefined) return;

    if (!state)
      scanCategories(s).then(
        (data) => {
          categories = data.data.map((item) => ({
            value: item.name,
            label: item.id,
          }));
          setState(data.data);
        },
      ).catch(
        (err) => {
          console.log(err.message);
        },
      );

    state?.forEach((item) => {
      if (item.name == formState.categorieId) {
        setCategory(item);
        if (formState.customSpecs?.length != item.customSpecTemplates?.length)
          item?.customSpecTemplates?.forEach((item) => {
            formState.customSpecs?.push({
              fieldName: item.fieldName,
              unitMisure: item.unitMisure,
              value: ''
            });
          })
      }
    })

    if (!formState.customSpecs)
      category?.customSpecTemplates?.forEach((item) => {
        formState.customSpecs?.push({
          fieldName: item.fieldName,
          unitMisure: item.unitMisure,
          value: ''
        });
      })
    console.log(formState);
  }, [state, setState, session, categories, category, setCategory]);

  const handleChange = (e) => {

    if (e.target.name === 'availabilityQta' || e.target.name === 'price' || e.target.name === 'discount') {
      formState[e.target.name] = +e.target.value
    }

    else if (e.target.name === 'categorieId') {
      formState.categorieId = e.target.value;
      formState.customSpecs = new Array();
    }

    else if (e.target.name === 'customSpecs')
      //let specValue = formState.customSpecs?.find((x) => x.fieldName === e.target.key)
      formState.customSpecs?.forEach((item, i) => {
        if (item.fieldName === e.target.id)
          item.value = e.target.value
      })
    else
      formState[e.target.name] = e.target.name === 'isSalable' ? e.target.checked : e.target.value;


    setFormState({ ...formState });
  };

  const s3 = new AWS.S3();

  const uploadFile = async (fileName) => {
    const image = await Image.createImageFromPath(fileName, 'a');
    console.log(image);
    console.log(fileName);
    // Read content from the file

    const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
    const S3params = {
      Bucket: 'techsweave-images-bucket',
      Key: await image.getKey(), // File name you want to save as in S3
      Body: fileContent,
    };

    // Uploading files to the bucket
    return s3.upload(S3params).promise();
  };
  const submitForm = async () => {
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      session?.accessToken as string,
      session?.idToken as string,
    );
    await productService.createAsync(formState);

    uploadFile(formState.imageURL).then(
      (data) => console.log(data),
    );
  };

  return (
    <form>
      <FormControl>
        <FormLabel>Product title</FormLabel>
        <Input name="title" id="title" placeholder="Product title" value={formState.title} onChange={handleChange} />

        <FormLabel mt="1%">Product price</FormLabel>
        <NumberInput>
          <NumberInputField name="price" id="price" precision={2} min={1} value={formState.price} onChange={handleChange} />
        </NumberInput>

        <FormLabel mt="1%">Product description</FormLabel>
        <Textarea name="description" id="description" placeholder="Product description" value={formState.description} onChange={handleChange} />

        <FormLabel mt="1%">Product category</FormLabel>
        <Select id="categorieId" name="categorieId" placeholder="Select a category" value={formState.categorieId} onChange={handleChange}>
          {state?.map((item) => (<option key={item.id} >{item.name}</option>))}
        </Select>

        <Box hidden={category ? false : true}>
          <FormLabel mt="1%">Product specs</FormLabel>
          {
            category?.customSpecTemplates?.map((item, i) => (
              <Box>
                <FormLabel mt="1%">{item.fieldName} :</FormLabel>
                <Text key={item.fieldName}>
                  <Input name="customSpecs" key={item.fieldName} id={item.fieldName} placeholder="ciao" value={formState.customSpecs?.find((x) => x.fieldName === item.fieldName)?.value} onChange={handleChange} />
                  {item.unitMisure}
                </Text>
              </Box>
            ))
          }
          <FormLabel mt="1%">Product taxes: {category?.taxes}</FormLabel>
        </Box>

        <FormLabel mt="1%">Product discount</FormLabel>
        <NumberInput>
          <NumberInputField name="discount" id="discount" precision={2} min={0} value={formState.discount} onChange={handleChange} />
        </NumberInput>

        <FormLabel mt="1%" value={formState.availabilityQta}>Product availability  </FormLabel>
        <NumberInput>
          <NumberInputField id="availabilityQta" name="availabilityQta" min={0} value={formState.availabilityQta} onChange={handleChange} />
        </NumberInput>

        <FormLabel mt="1%" >Product image</FormLabel>
        <Input type="file" accept="image/*" margin-top="1%" name="image" value={formState.imageURL} onInput={handleChange} />

        <Stack spacing={10} direction="row">
          <Checkbox name="isSalable" id="isSalable" colorScheme="green" checked={formState.isSalable} onChange={handleChange}>
            <FormLabel mt="1%">Product salable (visible to customers)</FormLabel>
          </Checkbox>
        </Stack>

        <FormLabel mt="1%">Add some notes..</FormLabel>
        <Textarea name="notes" id="notes" placeholder="Product notes" value={formState.notes} onChange={handleChange} />

      </FormControl>

      <Button mt="1%" type="button" name="button" onClick={submitForm} leftIcon={<PlusSquareIcon size={20} />}> Submit</Button>
    </form>
  );
}

export default CreateNew;
