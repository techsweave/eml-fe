import React from 'react';
import { SimpleGrid, Heading, Box } from '@chakra-ui/react';
import PersonalInfo from '@components/profile/client/dashboard/PersonalInfo';
import BillingInfo from '@components/profile/client/dashboard/BillingInfo';
import PaymentInfo from '@components/profile/client/dashboard/PaymentInfo';

const DashboardContent = () => (
  <Box p={5}>
    <Heading size="md" mb={5}>My dashboard</Heading>
    <SimpleGrid columns={[1, 2, 2, 3]} spacing={['10', '10', '25', '50']}>
      <PersonalInfo />
      <BillingInfo />
      <PaymentInfo />
    </SimpleGrid>
  </Box>
);

export default DashboardContent;
