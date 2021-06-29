import React from 'react';
import { Box } from '@chakra-ui/react';

const PaymentInfo = () => (
  <Box rounded="lg" borderWidth={1} borderColor="gray.900" bg="gray.100" pl={5} pr={5} pt={3} pb={3}>
    {/* <Heading size="md" m={6}>Payment Informations</Heading> */}
    <Box
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="2xl"
    >
      <p>Payment Informations</p>
    </Box>
    <Box mt={3}>
      <p>Card type: type</p>
      <p>Card number: number</p>
      <p>Expire date: date</p>
    </Box>
  </Box>
);

export default PaymentInfo;
