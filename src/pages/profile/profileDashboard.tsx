import { useSession } from 'next-auth/client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { Stack, Flex } from '@chakra-ui/layout';
import Layout from '@components/Layout';
import NavigationDesktop from '@components/profile/NavigationDesktop';
import NavigationSmartphone from '@components/profile/NavigationSmartphone';
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
      <Stack direction={['column', 'column', 'row', 'row']}>
        <Flex as="nav" h="full" w={340} bg="gray.100" display={['none', 'none', 'inherit', 'inherit']}><NavigationDesktop /></Flex>
        <Flex as="nav" h="min-content" w="full" display={['flex', 'flex', 'none', 'none']} justify="center"><NavigationSmartphone /></Flex>
        <Flex as="main" justify="center"><DashboardContent /></Flex>
        {/* Hi,
        {session.user?.name}
        , welcome on our website */}
      </Stack>
    </Layout>
  );
}
