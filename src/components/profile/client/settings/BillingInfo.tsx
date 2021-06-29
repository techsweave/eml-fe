import React from 'react';
import {
  Box, Button, FormControl, FormLabel,
  Input, InputGroup, InputLeftElement, NumberDecrementStepper,
  NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  HStack, useNumberInput, VStack,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';

function HookUsage() {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 1,
    max: 99999,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });

  return (
    <HStack>
      <Button {...inc} size="sm" rounded="md" border="1px" borderColor="gray.200">+</Button>
      <Input {...input} size="sm" rounded="md" />
      <Button {...dec} size="sm" rounded="md" border="1px" borderColor="gray.200">-</Button>
    </HStack>
  );
}

const BillingInfo = () => (
  <Box rounded="lg" borderWidth={1} borderColor="gray.900" bg="gray.100" pl={5} pr={5} pt={3} pb={6}>
    <Box
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="2xl"
    >
      <p>Billing Informations</p>
    </Box>
    <VStack spacing="2" pt={3}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input variant="outline" size="sm" placeholder="Name" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Surname</FormLabel>
        <Input variant="outline" size="sm" placeholder="Surname" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Country</FormLabel>
        <Input variant="outline" size="sm" placeholder="Country" rounded="md" />
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Province</FormLabel>
          <Input variant="outline" size="sm" placeholder="Province" rounded="md" />
        </FormControl>
        <FormControl display={['none', 'none', 'block', 'block']}>
          <FormLabel>Cap</FormLabel>
          <NumberInput max={99999} min={0} variant="outline" size="sm" defaultValue={0} rounded="md">
            <NumberInputField rounded="md" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl display={['block', 'block', 'none', 'none']}>
          <FormLabel>Cap</FormLabel>
          <HookUsage />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel>City</FormLabel>
        <Input variant="outline" size="sm" placeholder="City" rounded="md" />
      </FormControl>
      <FormControl>
        <FormLabel>Avenue</FormLabel>
        <Input variant="outline" size="sm" placeholder="Avenue" rounded="md" />
      </FormControl>
      <FormControl display={['none', 'none', 'block', 'block']}>
        <FormLabel>Number</FormLabel>
        <NumberInput max={99999} min={0} variant="outline" size="sm" defaultValue={0} rounded="md">
          <NumberInputField rounded="md" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl display={['block', 'block', 'none', 'none']}>
        <FormLabel>Number</FormLabel>
        <HookUsage />
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

export default BillingInfo;
