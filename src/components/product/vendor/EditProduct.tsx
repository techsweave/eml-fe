import { useSession } from 'next-auth/client';
import React, { useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Text,
  HStack,
  Grid,
  GridItem,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import * as AWS from 'aws-sdk';
import { Services, Models, Image } from 'utilities-techsweave';
import Link from 'next/link';

function EditProduct(prop: { product: Models.Tables.IProduct }) {
  const { product } = prop;
  const p = product;
  const [formState, setFormState] = useState(p);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = useRef();
  const session = useSession()[0];
  const toast = useToast();
  const s3 = new AWS.S3();


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
      formState[e.target.name] = e.target.name === 'isSalable' ? e.target.checked : e.target.value;
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
    let updatedProduct;
    try {
      if (formState.imageURL !== product.imageURL) {
        const image = await Image.createImageFromPath(
          (formState.imageURL as any).name,
          formState.id,
        );
        console.log(image);
        if (product.imageURL) {
          await s3.deleteBucket(
            { Bucket: product.imageURL as string },
          ).promise();
        }
        await uploadFile(formState.imageURL as any, await image.getKey());
        formState.imageURL = await image.getBucketLink(
          process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET as string,
          process.env.NEXT_PUBLIC_S3_UPLOAD_REGION as string,
        );
      }
      updatedProduct = await productService.updateAsync(formState);
    } catch (error) {
      toast({
        title: error.name,
        description: error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      });
    }
    toast({
      position: 'top',
      render: () => (
        <Box color='white' p={3} bg='green.500' borderRadius='15px'>
          <Text textAlign='center'>Update successfully done</Text>
          <Text textAlign='center'>Click button to continue to the detail</Text>
          <Center>
            <Button color='black' as='a' href={`/products/detail/${updatedProduct.id}`}>Close</Button>
          </Center>
        </Box>

      ),
    });
  };

  const deleteProduct = async () => {
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      session?.accessToken as string,
      session?.idToken as string,
    );

    try {
      await productService.deleteAsync(product.id);
      if (product.imageURL) await s3.deleteBucket({ Bucket: product.imageURL }).promise();
    } catch (error) {
      toast({
        title: error.error.name,
        description: error.error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top-right',
      });
    }
    onCloseDelete();
    toast({
      position: 'top',
      render: () => (
        <Box color='white' p={3} bg='green.500' borderRadius='15px'>
          <Text textAlign='center'>Product successfully deleted</Text>
          <Text> </Text>
          <Text textAlign='center'>Click button to continue</Text>
          <Center>
            <Button color='black' as='a' href='/products/vendor'>Close</Button>
          </Center>
        </Box>

      ),
    });
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
            <Input type='number' name="price" id="price" precision={2} min={1} value={formState.price} onChange={handleChange} />

            <FormLabel mt="1%">Product description</FormLabel>
            <Textarea name="description" id="description" placeholder="Product description" value={formState.description} onChange={handleChange} />

            <FormLabel mt="1%">Product discount</FormLabel>
            <Input type='number' name="discount" id="discount" min={0} max={100} precision={0} value={formState.discount} onChange={handleChange} />

            <FormLabel mt="1%" value={formState.availabilityQta}>Product availability  </FormLabel>
            <Input type='number' name="availabilityQta" id="availabilityQta" min={0} precision={0} value={formState.availabilityQta} onChange={handleChange} />

            <FormLabel mt="1%">Product image</FormLabel>
            <Input type="file" accept="image/*" margin-top="1%" name="imageURL" onChange={handleChange} />

            <FormLabel mt="1%">Add some notes..</FormLabel>
            <Textarea name="notes" id="notes" placeholder="Product notes" value={formState.notes} onChange={handleChange} />
            <Center>
              <Link href={{ pathname: '/products/detail/[id]', query: { id: product.id } }}>
                <Button mt='16' colorScheme='green' size='lg'>VIEW PRODUCT</Button>
              </Link>
            </Center>

          </GridItem>
          <GridItem>
            {
              formState.customSpecs?.map((item) => (
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

            <Center>
              <Button mt='16' onClick={() => setIsOpenDelete(true)} colorScheme='red' size='lg'>DELETE PRODUCT</Button>
            </Center>
            <AlertDialog
              isOpen={isOpenDelete}
              leastDestructiveRef={cancelRef as any}
              onClose={onCloseDelete}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Product
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can&apos;t undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef as any} onClick={onCloseDelete}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={deleteProduct} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </GridItem>
        </Grid>
      </FormControl>
      <Center>
        <Button mt="1%" type="button" name="button" onClick={onOpen} leftIcon={<PlusSquareIcon size={20} alignSelf='center' />}> SUBMIT</Button>
      </Center>
      <Modal id='salable' isOpen={isOpen} onClose={onClose}>
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

export default EditProduct;
