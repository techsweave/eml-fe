import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import * as AWS from 'aws-sdk';
const userItem = (prop: { user: AWS.CognitoIdentityServiceProvider.UserType }) => {
  const { user } = prop;
  const handleChange = () => {
    const a = 2;
    console.log(a);
  };
  console.log(user)
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
    name: user.Attributes?.find((item) => item.Name === 'name')?.Value,
    familyName: user.Attributes?.find((item) => item.Name === 'family_name')?.Value,
    email: user.Attributes?.find((item) => item.Name === 'email')?.Value,
    birthdate: user.Attributes?.find((item) => item.Name === 'birthdate')?.Value?.toString(),
    emailVerified: user.Attributes?.find((item) => item.Name === 'email_verified')?.Value,
    address: user.Attributes?.find((item) => item.Name === 'address')?.Value
  }
  return (
    <Box w='100%' border='1px' borderColor='gray.100' borderRadius="15px" p='5'>
      <Text fontWeight='bold' fontSize='1.5em' mb='3'>{u.username}</Text>

      <Text>{u.name} {u.familyName}</Text>
      <Text> {u.birthdate} </Text>
      <Text mb='3'>Address: {u.address}</Text>

      <Text>Write an e-mail:</Text>
      <Link href={`mailto:${u.email}`}>{u.email}</Link>
    </Box>
  )
};
export default userItem;
