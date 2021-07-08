import React, { Component } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, VStack,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';

class ModButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
    };
  }

  /*  handleClick = () => {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }; */

  render() {
    return (
      <Button size="sm" rounded="md" variant="outline" w="full" onClick={this.handleClick}>{this.state.isToggleOn ? 'Save changes' : 'Modify'}</Button>
    );
  }
}

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
      <ModButton />
    </VStack>
  </Box>
);

export default PersonalInfo;
