import React from 'react';
import { SimpleGrid, Heading, Box, Center } from '@chakra-ui/react';
import PersonalInfo from '@components/profile/client/settings/PersonalInfo';
import BillingInfo from '@components/profile/client/settings/BillingInfo';
import PaymentInfo from '@components/profile/client/settings/PaymentInfo';

const SettingsContent = () => (
  <Box p={5}>
    <Center>
      <Heading size="md" mb={5}>My settings</Heading>
    </Center>
    <SimpleGrid columns={[1, 2, 2, 3]} spacing={['10', '10', '25', '50']}>
      <PersonalInfo />
      <BillingInfo />
      <PaymentInfo />
    </SimpleGrid>
  </Box>
);

export default SettingsContent;
