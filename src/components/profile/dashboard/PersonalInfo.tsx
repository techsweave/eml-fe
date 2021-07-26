import React, { useEffect, useState } from 'react';
import {
  Grid, GridItem, useToast,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { AuthenticatedUser } from 'utilities-techsweave';
import * as AWS from 'aws-sdk';

const initLoading = true;

const PersonalInfo = () => {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });
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
  if (error) {
    toast({
      title: error.name,
      description: error.message,
      status: 'error',
      duration: 10000,
      isClosable: true,
      position: 'top-right',
    });
  }
  return (
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']} gap={5}>
      <GridItem gap={2}>
        <p>
          Email:
          {' '}
          {state.email}
        </p>
        <p>
          Username:
          {' '}
          {state.username}
        </p>
      </GridItem>
      <GridItem>
        <p>
          Name:
          {' '}
          {state.name}

        </p>
        <p>
          Surname:
          {' '}
          {state.familyName}
        </p>
        <p>
          Birthdate:
          {' '}
          {state.birthdate}
        </p>
        <p>
          Telephone:
          {' '}
          {state.telephone}
        </p>
        <p>
          Address:
          {' '}
          {state.address}
        </p>
      </GridItem>
    </Grid>
  );
};

export default PersonalInfo;
