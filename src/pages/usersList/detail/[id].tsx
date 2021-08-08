import Layout from '@components/Layout';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
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
export const getStaticPaths: GetStaticPaths = async () => {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });
  const provider = new AWS.CognitoIdentityServiceProvider();
  const response = await provider.listUsers({
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
  }).promise();
  const id = response.Users!;
  const paths = id.map((idPath) => ({ params: { id: idPath.Username } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    },
  });
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
