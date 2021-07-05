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
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import * as AWS from 'aws-sdk';
import { Services, Models, Image } from 'utilities-techsweave';
// const fs = require('fs');
import * as fs from 'fs';

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
  let categories: Array<Item> = [];

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

  useEffect(() => {
    if (state !== undefined) return;
    const s = session;

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
  }, [state, setState, session, categories]);

  const [formState, setFormState] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    availability: 0,
    image: '',
    isSalable: false,
  });

  const handleChange = (e) => {
    formState[e.target.name] = e.target.name === 'isSalable' ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: e.target.name === 'isSalable' ? e.target.checked : e.target.value,
    });
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

    uploadFile(formState.image).then(
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
        <Select id="category" name="category" placeholder="Select a category" value={formState.category} onChange={handleChange}>
          {state?.map((item) => (<option key={item.id}>{item.name}</option>))}
        </Select>

        <FormLabel mt="1%" value={formState.availability}>Product availability  </FormLabel>
        <NumberInput>
          <NumberInputField id="availability" name="availability" min={1} value={formState.availability} onChange={handleChange} />
        </NumberInput>

        <FormLabel mt="1%" >Product image</FormLabel>
        <Input type="file" accept="image/*"
          margin-top="1%" name="image" value={formState.image} onInput={handleChange} />

        <Stack spacing={10} direction="row">
          <Checkbox name="isSalable" id="isSalable" colorScheme="green" checked={formState.isSalable} onChange={handleChange}>
            <FormLabel mt="1%">Product salable (visible to customers)</FormLabel>
          </Checkbox>
        </Stack>

      </FormControl>

      <Button mt="1%" type="button" name="button" onClick={submitForm} leftIcon={<PlusSquareIcon size={20} />}> Submit</Button>
    </form>
  );
}

export default CreateNew;
