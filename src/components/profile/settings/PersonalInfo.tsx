import React, { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement,
  Text, Grid, GridItem, Center,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { AuthenticatedUser } from 'utilities-techsweave';
import { useSession } from 'next-auth/client';

const initLoading = true;

const PersonalInfo = () => {
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
  });
  const handleChange = (e) => {
    formState[e.target.name] = e.target.value;
    setFormState({
      ...formState,
    });
  };
  const submitForm = async () => {
    const user = await AuthenticatedUser.fromToken(session?.accessToken as string);
    await user.setName(formState.name, process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string);
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
            <Input variant='outline' size='sm' name='name' placeholder={state.name} value={formState.name} rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Surname</FormLabel>
            <Input variant='outline' size='sm' name='familyName' placeholder={state.familyName} value={formState.familyName} rounded='md' onChange={handleChange} />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Old assword</FormLabel>
            <Input variant='outline' size='sm' placeholder='old password' rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>New password</FormLabel>
            <Input variant='outline' size='sm' placeholder='new password' rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm new password</FormLabel>
            <Input variant='outline' size='sm' placeholder='confirm new password' rounded='md' onChange={handleChange} />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input variant='outline' size='sm' name='address' placeholder={state.address} value={formState.address} rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Birthdate</FormLabel>
            <Input variant='outline' size='sm' name='birthdate' placeholder={state.birthdate} value={formState.birthdate} rounded='md' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Telephone</FormLabel>
            <InputGroup size='sm'>
              <InputLeftElement>
                <PhoneIcon color='gray.300' />
              </InputLeftElement>
              <Input placeholder={state.telephone} name='telephone' value={formState.telephone} variant='outline' rounded='md' onChange={handleChange} />
            </InputGroup>
          </FormControl>
        </GridItem>
      </Grid>
      <Center><Button mt='5' type='button' name='button' onClick={submitForm}>Submit</Button></Center>
    </Box>
  );
};
export default PersonalInfo;
