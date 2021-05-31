import { useSession } from 'next-auth/client';
import Layout from '@components/Layout';
import React from 'react';
import { Box } from '@chakra-ui/react';

export default function auth() {
  const [session] = useSession();
  if (!session) {
    return (
      <Layout title="Profile page - EmporioLambda">
        <Box>User not authenticated</Box>
      </Layout>
    );
  }
  return (
    <Layout title="Profile page - EmporioLambda">
      <Box>
        Hi,
        {session.user?.name}
        , welcome on our website
      </Box>
    </Layout>

  );
}
