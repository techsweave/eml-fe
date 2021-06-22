import { useSession } from 'next-auth/client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { HStack, Flex } from '@chakra-ui/layout';
import Layout from '@components/Layout';
import Navigation from '@components/profile/Navigation';
import DashboardContent from '@components/profile/DashboardContent';

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
      <HStack spacing={0}>
        <Flex as="nav" h="full" w={340} bg="gray.100"><Navigation /></Flex>
        <Flex as="main" h="full"><DashboardContent /></Flex>
        {/* Hi,
        {session.user?.name}
        , welcome on our website */}
      </HStack>
    </Layout>
  );
}
