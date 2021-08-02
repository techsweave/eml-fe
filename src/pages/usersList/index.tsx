import Layout from '@components/Layout';
import React, { useEffect, useState } from 'react';
import { Flex, Grid, GridItem, Box } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';
import { GetStaticProps } from 'next';
import * as AWS from 'aws-sdk';
import UserItem from '@components/users/UserItem';
export default function productPage(prop) {

  const usersList = JSON.parse(prop.usersList);
  return (
    <Layout title="Product-page">
      <Box p='5'>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={10}>
          {
            usersList.map((item) => (
              <GridItem>
                <UserItem user={item} />
              </GridItem>
            ))
          }
        </Grid>
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  //must pass to parse because of birthdate not serializable
  let usersList: string = '';

  try {
    const provider = new AWS.CognitoIdentityServiceProvider();
    const response = await provider.listUsers({
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
    }).promise();
    usersList = JSON.stringify(response.Users!);
  } catch (err) { }

  return {
    props: {
      usersList,
    },
  };
};
