import React from 'react';
import { SimpleGrid, Heading, Box, Center } from '@chakra-ui/react';
import PersonalInfo from '@components/profile/client/dashboard/PersonalInfo';
import BillingInfo from '@components/profile/client/dashboard/BillingInfo';

const DashboardContent = () => (
  <Box p={5}>
    <Center>
      <Heading size="md" mb={5}>My dashboard</Heading>
    </Center>
    <SimpleGrid columns={[1, 2, 2, 3]} spacing={['10', '10', '25', '50']}>
      <PersonalInfo />
      <BillingInfo />
    </SimpleGrid>
  </Box>
);

export default DashboardContent;
