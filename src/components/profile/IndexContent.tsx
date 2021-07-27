import React from 'react';
import {
  Heading, Box, Center,
} from '@chakra-ui/react';
import PersonalInfo from '@components/profile/dashboard/PersonalInfo';

const DashboardContent = () => (
  <Box p={5}>
    <Center>
      <Heading size="md" mb={5}>My dashboard</Heading>
    </Center>
    <PersonalInfo />
  </Box>
);

export default DashboardContent;
