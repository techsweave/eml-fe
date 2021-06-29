import React from 'react';
import {
  Box, VStack, Input, FormControl, FormLabel,
} from '@chakra-ui/react';

const PaymentInfo = () => (
  <Box rounded="lg" borderWidth={1} borderColor="gray.900" bg="gray.100" pl={5} pr={5} pt={3} pb={6}>
    <Box
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="2xl"
    >
      <p>Payment Informations</p>
    </Box>
    <VStack spacing="5" mt={3}>
      <FormControl>
        <FormLabel>Card type</FormLabel>
        <Input variant="outline" size="sm" placeholder="Card type" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Card number</FormLabel>
        <Input variant="outline" size="sm" placeholder="Card number" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Expire date</FormLabel>
        <Input variant="outline" size="sm" placeholder="Expire date" rounded="md" />
      </FormControl>
    </VStack>
  </Box>
);

export default PaymentInfo;
