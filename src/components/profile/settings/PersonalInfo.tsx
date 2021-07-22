import React, { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement,
  Text, Grid, GridItem, Center, useToast,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { AuthenticatedUser } from 'utilities-techsweave';
import { useSession } from 'next-auth/client';
import showError from '@libs/showError';

const initLoading = true;

const PersonalInfo = () => {
  const toast = useToast();
  const session = useSession()[0];
  const [error, setError] = useState<Error>();
  const [state, setState] = useState({
    email: '',
    username: '',
    name: '',
    familyName: '',
    telephone: '',
    birthdate: '',
    address: '',

  });
  const [loading, setLoading] = useState(initLoading);
  async function fetchData(s) {
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return {
      email: await user.getEmail(),
      username: await user.getUserId(),
      name: await user.getName(),
      familyName: await user.getFamilyName(),
      telephone: await user.getPhoneNumber(),
      birthdate: await user.getBirthdate(),
      address: await user.getAddress(),
    };
  }
  useEffect(() => {
    const s = session;
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!loading) return;
    if (error) return;

    fetchData(s)
      .then((data) => {
        setLoading(false);
        setState(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.error);
      });
  }, [state, setState, error, setError, loading, setLoading, fetchData]);
  const [formState, setFormState] = useState({
    name: '',
    familyName: '',
    address: '',
    birthdate: '',
    telephone: '',
    newPWD: '',
    oldPWD: '',
    confirmPWD: '',
  });
  const handleChange = (e) => {
    formState[e.target.name] = e.target.value;
    setFormState({
      ...formState,
    });
  };
  const submitForm = async () => {
    const user = await AuthenticatedUser.fromToken(session?.accessToken as string);
    const result = await user.setAttributes(
      session?.accessToken as string, formState.name, formState.familyName,
      formState.telephone, formState.birthdate, formState.address,
    );
    if (!result.$response.error) {
      toast({
        position: 'top',
        duration: null,
        render: () => (
          <Box color='white' p={3} bg='green.500' borderRadius='15px'>
            <Text textAlign='center'>Update successfully done</Text>
            <Text textAlign='center'>Click button to continue</Text>
            <Center>
              <Button color='black' as='a' href='/profile'>Close</Button>
            </Center>
          </Box>

        ),
      });
    } else {
      showError(result.$response.error);
    }
  };
  const changePwd = async () => {
    if (formState.newPWD !== '' && formState.oldPWD !== '' && formState.confirmPWD !== '') {
      if (formState.oldPWD === formState.newPWD) {
        toast({
          title: 'Password Error',
          description: 'New password is the same of old password',
          status: 'error',
          duration: null,
          isClosable: true,
          position: 'top-right',
        });
      } else if (formState.newPWD !== formState.confirmPWD) {
        toast({
          title: 'Password Error',
          description: 'New password and confirm password isn&#8217;t the same',
          status: 'error',
          duration: null,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        const user = await AuthenticatedUser.fromToken(session?.accessToken as string);
        const result = await user.changePassword(session?.accessToken as string,
          formState.oldPWD, formState.newPWD);
        if (!result.$response.error) {
          toast({
            position: 'top',
            duration: null,
            render: () => (
              <Box color='white' p={3} bg='green.500' borderRadius='15px'>
                <Text textAlign='center'>Update successfully done</Text>
                <Text textAlign='center'>Click button to continue</Text>
                <Center>
                  <Button color='black' as='a' href='/profile'>Close</Button>
                </Center>
              </Box>

            ),
          });
        } else {
          showError(result.$response.error);
        }
      }
    }
  };
  return (
    <Box alignSelf='center'>
      <Text textAlign='center' fontWeight='bold' fontSize='3xl'>
        Personal informations
      </Text>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={10} alignSelf='center'>
        <GridItem>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input variant='outline' type='text' size='sm' name='name' placeholder={state.name} value={formState.name} rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Surname</FormLabel>
            <Input variant='outline' type='' size='sm' name='familyName' placeholder={state.familyName} value={formState.familyName} rounded='md' onChange={handleChange} />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input variant='outline' size='sm' type='address' name='address' placeholder={state.address} value={formState.address} rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Birthdate</FormLabel>
            <Input variant='outline' size='sm' type='date' name='birthdate' placeholder={state.birthdate} value={formState.birthdate} rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Telephone</FormLabel>
            <InputGroup size='sm'>
              <InputLeftElement>
                <PhoneIcon color='gray.300' />
              </InputLeftElement>
              <Input placeholder={state.telephone} name='telephone' type='tel' value={formState.telephone} variant='outline' rounded='md' onChange={handleChange} />
            </InputGroup>
          </FormControl>
        </GridItem>
      </Grid>
      <Center><Button mt='5' type='button' name='button' onClick={submitForm}>Submit</Button></Center>
      <Box>
        <Text textAlign='center' fontWeight='bold' fontSize='3xl'>
          Change password
        </Text>
        <FormControl>
          <FormLabel>Old password</FormLabel>
          <Input variant='outline' type='password' size='sm' name='oldPWD' value={formState.oldPWD} placeholder='old password' rounded='md' onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>New password</FormLabel>
          <Input variant='outline' type='password' size='sm' name='newPWD' value={formState.newPWD} placeholder='new password' rounded='md' onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm new password</FormLabel>
          <Input variant='outline' type='password' size='sm' name='confirmPWD' value={formState.confirmPWD} placeholder='confirm new password' rounded='md' onChange={handleChange} />
        </FormControl>
        <Center><Button mt='5' type='button' name='button' onClick={changePwd}>Change password</Button></Center>
      </Box>
    </Box>
  );
};
export default PersonalInfo;
