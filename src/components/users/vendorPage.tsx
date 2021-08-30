import React from 'react';
import {
  Avatar, Box, Button, Flex, HStack, Text,
} from '@chakra-ui/react';
import * as AWS from 'aws-sdk';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

const vendorPage = (prop: { user: AWS.CognitoIdentityServiceProvider.AdminGetUserResponse }) => {
  const { user } = prop;
  let u: {
    username: string
    name?: string,
    familyName?: string,
    birthdate?: string,
    email?: string,
    emailVerified?: string
    phoneNumber?: string,
    phoneNumberVerified?: string,
    address?: string

  };
  u = {
    username: user.Username as string,
    name: user.UserAttributes?.find((item) => item.Name === 'name')?.Value,
    familyName: user.UserAttributes?.find((item) => item.Name === 'family_name')?.Value,
    email: user.UserAttributes?.find((item) => item.Name === 'email')?.Value,
    birthdate: user.UserAttributes?.find((item) => item.Name === 'birthdate')?.Value?.toString(),
    emailVerified: user.UserAttributes?.find((item) => item.Name === 'email_verified')?.Value,
    address: user.UserAttributes?.find((item) => item.Name === 'address')?.Value,
  };
  return (
    <Flex w='100%' direction={['column', 'column', 'row', 'row']} alignSelf="center">
      <Button as="a" href='/' ml='2.5' mb='5' w='100px' mt='2' leftIcon={<ArrowBackIcon />} bg='gray.100'>back</Button>
      <HStack textAlign='center' ml='25%' mt='20'>
        <Text fontWeight='bold'>
          Hi, i&apos;m
          {' '}
          {u.name}
          {' '}
          {u.familyName}
        </Text>
        <Text fontWeight='bold'>to contact me you can write me a mail at: </Text>
        <Link href={`mailto:${u.email}`}>{u.email}</Link>
      </HStack>
    </Flex>
  );
};
export default vendorPage;
