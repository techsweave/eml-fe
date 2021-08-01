import { useSession } from 'next-auth/client';
import React, { ReactElement, useState, useRef } from 'react';
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import * as AWS from 'aws-sdk';
import { Services, Models } from 'utilities-techsweave';

const CreateNew = (prop: { categoriesList: Array<Models.Tables.ICategory> }) => {
  const { categoriesList } = prop;
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });
  const toast = useToast();
  const session = useSession()[0];
  const [categoryId, setCategoryId] = useState('');
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const onCloseDelete = () => setIsOpenDelete(false);
  const cancelRef = useRef();

  const handleClick = (e) => {
    setCategoryId(e.target.id)
    setIsOpenDelete(true);
  };

  const deleteCategory = async () => {
    console.log(categoryId)
    const productService = new Services.Products(
      process.env.NEXT_PUBLIC_API_ID_PRODUCTS as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      session?.accessToken as string,
      session?.idToken as string,
    );
    const categoryService = new Services.Categories(
      productService,
      process.env.NEXT_PUBLIC_API_ID_CATEGORIES as string,
      process.env.NEXT_PUBLIC_API_REGION as string,
      process.env.NEXT_PUBLIC_API_STAGE as string,
      session?.accessToken as string,
      session?.idToken as string,
    )

    try {
      await categoryService.deleteAsync(categoryId);
      onCloseDelete();
    } catch (error) {
      onCloseDelete();
      if (error.name == 'CategoryDeleteNotAllowed')
        toast({
          title: 'CategoryDeleteNotAllowed',
          description: `This category is related to some products`,
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'top-right',
        });
      else
        toast({
          title: error.name,
          description: error.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'top-right',
        });
      return;
    }
    toast({
      position: 'top',
      render: () => (
        <Box color='white' p={3} bg='green.500' borderRadius='15px'>
          <Text textAlign='center'>Category successfully deleted</Text>
          <Text> </Text>
          <Text textAlign='center'>Click button to continue</Text>
          <Center>
            <Button color='black' as='a' href='/manageShop'>Close</Button>
          </Center>
        </Box>

      ),
    });
  };

  return (
    <form>
      <FormControl>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={10}>
          {
            categoriesList.map((item) => (
              <GridItem key={item.id}>
                <Box w='100%' border='1px' borderColor='gray.100' borderRadius="15px">
                  <Stack p='5'>
                    <Text fontWeight='bold' fontSize='1.5em'>{item.name}</Text>
                    {
                      item.customSpecTemplates?.map((element) => (
                        <Text key={element.fieldName} textAlign='left'>{element.fieldName} {element.unitMisure ? `(${element.unitMisure})` : ''}</Text>
                      ))
                    }
                    <Button id={item.id} mt='16' onClick={handleClick} colorScheme='red'>DELETE CATEGORY</Button>
                  </Stack>
                </Box>
              </GridItem>
            ))
          }
        </Grid>
      </FormControl>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef as any}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button id={categoryId} colorScheme="red" onClick={deleteCategory} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </form >
  );
}

export default CreateNew;
