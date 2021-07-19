import React from 'react';
import { Box } from '@chakra-ui/react';

const BillingInfo = () => (
  <Box rounded="lg" borderWidth={1} borderColor="gray.900" bg="gray.100" pl={5} pr={5} pt={3} pb={3}>
    {/* <Heading size="md" m={6}>Billing Informations</Heading> */}
    <Box
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="2xl"
    >
      <p>Billing Informations</p>
    </Box>
    <Box pt={3}>
      <p>Name: name</p>
      <p>Address: avenue and number</p>
      <p>Address: city, province, cap</p>
      <p>Address: country</p>
      <p>Telephone: telephone</p>
    </Box>
  </Box>
);

export default BillingInfo;
