import Layout from '@components/Layout';
import React from 'react';
import { GetServerSideProps } from 'next';
import * as AWS from 'aws-sdk';
import UserDetail from '@components/users/UserDetail';

export default function productPage(prop) {
  const user = JSON.parse(prop.user);
  return (
    <Layout title={user.Username}>
      <UserDetail user={user} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // must pass to parse because of birthdate not serializable
  let user = '';

  try {
    const provider = new AWS.CognitoIdentityServiceProvider();
    const response = await provider.adminGetUser({
      Username: context.params?.id as string,
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
    }).promise();
    user = JSON.stringify(response);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      user,
    },
  };
};
