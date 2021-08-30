import Layout from '@components/Layout';
import React from 'react';
import { GetStaticProps } from 'next';
import * as AWS from 'aws-sdk';
import VendorPage from '@components/users/vendorPage';

export default function productPage(prop) {
  const user = JSON.parse(prop.user);
  console.log(user);
  return (
    <Layout title={user.Username}>
      <VendorPage user={user} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
    const response = await provider.listUsersInGroup({
      GroupName: 'Vendor',
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
    }).promise();
    const response2 = await provider.adminGetUser({
      Username: response.Users![0].Username as string,
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
    }).promise();
    user = JSON.stringify(response2);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      user,
    },
  };
};
