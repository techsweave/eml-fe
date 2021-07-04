import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
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
  const session = useSession()[0];
  const [error, setError] = useState<Error>();
  const [state, setState] = useState({
    email: '',
    username: '',
    name: '',
    familyName: '',
    telephone: '',
    brithdate: '',
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
      brithdate: await user.getBirthdate(),
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
  console.log(state.email);
  return (
    <Box rounded="lg" borderWidth={1} borderColor="gray.900" bg="gray.100" pl={5} pr={5} pt={3} pb={3}>
      <Box
        fontWeight="bold"
        letterSpacing="wide"
        fontSize="2xl"
      >
        <p>Personal informations</p>
      </Box>
      <Box mt={3}>
        <p>
          Name:&nbsp;
          {state.name}

        </p>
        <p>
          Surname: &nbsp;
          {state.familyName}
        </p>
        <p>
          Birthdate: &nbsp;
          {state.brithdate}
        </p>
        <p>
          Email:
          &nbsp;
          {state.email}
        </p>
        <p>
          Username:
        &nbsp;
          {state.username}
        </p>
        <p>
          Telephone: &nbsp;
          {state.telephone}
        </p>
        <p>
          Address: &nbsp;
          {state.address}
        </p>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
