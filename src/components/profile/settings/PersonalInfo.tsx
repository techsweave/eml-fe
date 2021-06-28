import React from 'react';
import {
  Box, FormControl, FormLabel, Input, InputGroup, InputLeftElement, VStack,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';

const PersonalInfo = () => (
  <Box rounded="lg" borderWidth={1} borderColor="gray.900" bg="gray.100" pl={5} pr={5} pt={3} pb={6}>
    <Box
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="2xl"
    >
      <p>Personal informations</p>
    </Box>
    <VStack spacing="5" mt={3}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input variant="outline" size="sm" placeholder="Name" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Surname</FormLabel>
        <Input variant="outline" size="sm" placeholder="Surname" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <InputGroup size="sm">
          <InputLeftElement>
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Mail" variant="outline" rounded="md" />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input variant="outline" size="sm" placeholder="User" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Telephone</FormLabel>
        <InputGroup size="sm">
          <InputLeftElement>
            <PhoneIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Phone number" variant="outline" rounded="md" />
        </InputGroup>
      </FormControl>
    </VStack>
  </Box>
);

export default PersonalInfo;
