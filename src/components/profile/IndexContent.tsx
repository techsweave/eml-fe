import React from 'react';
import {
  SimpleGrid, Heading, Box, Center,
} from '@chakra-ui/react';
import PersonalInfo from '@components/profile/dashboard/PersonalInfo';

const DashboardContent = () => (
  <Box p={5}>
    <Center>
      <Heading size="md" mb={5}>My dashboard</Heading>
    </Center>
    <SimpleGrid columns={[1, 2, 2, 3]} spacing={['10', '10', '25', '50']}>
      <PersonalInfo />
    </SimpleGrid>
  </Box>
);

export default DashboardContent;
