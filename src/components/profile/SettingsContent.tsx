import React from 'react';
import { SimpleGrid, Heading, Box } from '@chakra-ui/react';
import PersonalInfo from '@components/profile/settings/PersonalInfo';
import BillingInfo from '@components/profile/settings/BillingInfo';
import PaymentInfo from '@components/profile/settings/PaymentInfo';

const SettingsContent = () => (
  <Box p={5}>
    <Heading size="md" mb={5}>My settings</Heading>
    <SimpleGrid columns={[1, 2, 2, 3]} spacing={['10', '10', '25', '50']}>
      <PersonalInfo />
      <BillingInfo />
      <PaymentInfo />
    </SimpleGrid>
  </Box>
);

export default SettingsContent;
