import React from 'react';
import { Box } from '@chakra-ui/react';

const PersonalInfo = () => (
  <Box rounded="lg" borderWidth={1} borderColor="gray.900" bg="gray.100" pl={5} pr={5} pt={3} pb={3}>
    {/* <Heading size="md" m={6}>Personal informations</Heading> */}
    <Box
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="2xl"
    >
      <p>Personal informations</p>
    </Box>
    <Box mt={3}>
      <p>Name: name</p>
      <p>Surname: surname</p>
      <p>Email: email</p>
      <p>Username: username</p>
      <p>Telephone: telephone</p>
    </Box>
  </Box>
);

export default PersonalInfo;
