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
  Box,
  Text,
  HStack,
  Grid,
  GridItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import * as AWS from 'aws-sdk';
import { Services, Models, Image } from 'utilities-techsweave';

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
  const [category, setCategory] = useState<Models.Tables.ICategory>();
  const [formState, setFormState] = useState<Models.Tables.INewProduct>({
    title: '',
    price: 0,
    description: '',
    categorieId: '',
    availabilityQta: 0,
    isSalable: false,
    customSpecs: [],
    discount: 0,
    imageURL: '',
    notes: '',
    tags: [],
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const s3 = new AWS.S3();
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
    const s = session;

    if (!state) {
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
          toast({
            title: err.error.name,
            description: err.error.message,
            status: 'error',
            duration: 10000,
            isClosable: true,
            position: 'top-right',
          });
        },
      );
    }

    state?.forEach((item) => {
      if (item.name === formState.categorieId) {
        setCategory(item);
        if (formState.customSpecs?.length !== item.customSpecTemplates?.length) {
          item?.customSpecTemplates?.forEach((element) => {
            formState.customSpecs?.push({
              fieldName: element.fieldName,
              unitMisure: element.unitMisure ? element.unitMisure : '',
              value: '',
            });
          });
        }
      }
    });

    if (formState.categorieId !== '' && formState.customSpecs?.length === 0) {
      category?.customSpecTemplates?.forEach((item) => {
        formState.customSpecs?.push({
          fieldName: item.fieldName,
          unitMisure: item.unitMisure ? item.unitMisure : '',
          value: '',
        });
      });
    }
  }, [state, setState, session, categories, category, setCategory]);

  const handleChange = (e) => {
    if (e.target.name === 'availabilityQta' || e.target.name === 'price') {
      formState[e.target.name] = +e.target.value;
    } else if (e.target.name === 'discount') {
      formState.discount = +e.target.value < 100 ? +e.target.value : 100;
    } else if (e.target.name === 'imageURL') {
      [formState.imageURL] = e.target.files;
    } else if (e.target.name === 'categorieId') {
      formState.categorieId = e.target.value;
      formState.customSpecs = [];
    } else if (e.target.name === 'customSpecs') {
      formState.customSpecs?.forEach((item) => {
        if (item.fieldName === e.target.id) {
          item.value = e.target.value;
        }
      });
    } else {
      formState[e.target.name] = e.target.value;
    }
    setFormState({ ...formState });
  };

  const uploadFile = async (file: Blob, key: string) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // Setting up S3 upload parameters
    const S3params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET as string,
      Key: key, // File name you want to save as in S3
      Body: file,
      ACL: 'public-read',
      ContentType: 'image',
    };

    // Uploading files to the bucket
    await s3.upload(S3params).promise();
  };

  const submitForm = async (isSalable: boolean) => {
    formState.isSalable = isSalable;
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      session?.accessToken as string,
      session?.idToken as string,
    );
    if (formState.categorieId !== '') {
      const categoryToPush = state?.find((x) => x.name === formState.categorieId);
      formState.categorieId = categoryToPush?.id;
    }
    const createdProduct: Models.Tables.IProduct = await productService.createAsync(formState);

    if (formState.imageURL !== '') {
      try {
        const image = await Image.createImageFromPath(
          (formState.imageURL as any).name,
          createdProduct.id,
        );
        createdProduct.imageURL = await image.getBucketLink(
          process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET as string,
          process.env.NEXT_PUBLIC_S3_UPLOAD_REGION as string,
        );
        await uploadFile(formState.imageURL as any, await image.getKey());
        formState.imageURL = createdProduct.imageURL;

        await productService.updateAsync(createdProduct);
      } catch (err) {
        toast({
          title: err.error.name,
          description: err.error.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'top-right',
        });
        await productService.deleteAsync(createdProduct.id);
      }
    }

    toast({
      position: 'top',
      render: () => (
        <Box color='white' p={3} bg='green.500' borderRadius='15px'>
          <Text textAlign='center'>Creation successfully done</Text>
          <Text textAlign='center'>Click button to continue</Text>
          <Center>
            <Button color='black' as='a' href="/products">Close</Button>
          </Center>
        </Box>
      ),
    });
  };

  const preSubmitForm = async () => {
    if (
      formState.title === ''
      || formState.price === 0
      || formState.categorieId === ''
      || formState.imageURL === ''
      || formState.availabilityQta === 0
    ) {
      toast({
        position: 'top',
        duration: 5000,
        isClosable: true,
        title: 'Missing required fields',
        description: 'Fields with * are required',
        status: 'error',
      });
    } else {
      onOpen();
    }
  };

  const submitPrivateForm = async () => {
    onClose();
    await submitForm(false);
  };

  const submitPublicForm = async () => {
    onClose();
    await submitForm(true);
  };

  return (
    <form>
      <FormControl>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']} gap={['1', '5', '10', '50']}>
          <GridItem>
            <FormLabel>Product title</FormLabel>
            <Input name="title" id="title" placeholder="Product title" value={formState.title} onChange={handleChange} />

            <FormLabel mt="1%">Product price</FormLabel>
            <NumberInput>
              <NumberInputField name="price" id="price" precision={2} min={1} value={formState.price} onChange={handleChange} />
            </NumberInput>

            <FormLabel mt="1%">Product description</FormLabel>
            <Textarea name="description" id="description" placeholder="Product description" value={formState.description} onChange={handleChange} />

            <FormLabel mt="1%">Product discount</FormLabel>
            <NumberInput min={0} max={100} precision={0}>
              <NumberInputField name="discount" id="discount" value={formState.discount} onChange={handleChange} />
            </NumberInput>

            <FormLabel mt="1%" value={formState.availabilityQta}>Product availability  </FormLabel>
            <NumberInput>
              <NumberInputField id="availabilityQta" name="availabilityQta" min={0} value={formState.availabilityQta} onChange={handleChange} />
            </NumberInput>

            <FormLabel mt="1%">Product image</FormLabel>
            <Input type="file" accept="image/*" margin-top="1%" name="imageURL" onChange={handleChange} />

            <FormLabel mt="1%">Add some notes..</FormLabel>
            <Textarea name="notes" id="notes" placeholder="Product notes" value={formState.notes} onChange={handleChange} />
          </GridItem>
          <GridItem>
            <FormLabel mt="1%">Product category</FormLabel>
            <Select id="categorieId" name="categorieId" placeholder="Select a category" value={formState.categorieId} onChange={handleChange}>
              {state?.map((item) => (<option key={item.id}>{item.name}</option>))}
            </Select>

            <Box hidden={!category}>
              <FormLabel mt="1%">Product specs</FormLabel>
              {
                category?.customSpecTemplates?.map((item) => (
                  <HStack mt='1%' key={item.fieldName}>
                    <FormLabel mt="1%" minW='20%' maxW='20%'>
                      {item.fieldName}
                      :
                    </FormLabel>
                    <Input name="customSpecs" id={item.fieldName} placeholder={item.fieldName} value={formState.customSpecs?.find((x) => x.fieldName === item.fieldName)?.value} onChange={handleChange} />
                    <Text>
                      {item.unitMisure}
                    </Text>
                  </HStack>
                ))
              }
              <FormLabel mt="1%">
                Product taxes:
                {' '}
                {category?.taxes}
              </FormLabel>
            </Box>
          </GridItem>
        </Grid>
      </FormControl>

      <Button mt="1%" type="button" name="button" onClick={preSubmitForm} leftIcon={<PlusSquareIcon size={20} alignSelf='center' />}> Submit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make product salable?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Will the product be public for customers?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={submitPrivateForm}>Make private</Button>
            <Button colorScheme="green" onClick={submitPublicForm}>Publish product</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}

export default CreateNew;
