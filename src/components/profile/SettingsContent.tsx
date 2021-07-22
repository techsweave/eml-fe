import React from 'react';
import {
  Heading, Box, Center,
} from '@chakra-ui/react';
import PersonalInfo from '@components/profile/settings/PersonalInfo';

const SettingsContent = () => (
  <Box p={5}>
    <Center>
      <Heading size="md" mb={5}>My settings</Heading>
    </Center>
    <PersonalInfo />
  </Box>
);

export default SettingsContent;
