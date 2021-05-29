import React from 'react';
import {
  Flex, HStack,
} from '@chakra-ui/layout';
import {
  Button, Image, IconButton, Input, InputGroup, InputRightElement,
  Spacer, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Box,
} from '@chakra-ui/react';
import { StarIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';

const Header = () => (
  <Flex w="full" h="20" borderBottomWidth={1} borderBottomColor="red" justify="space-between" align="center" wrap="nowrap">
    <Box as="a" href="/" ml="2" minW="200"><Image src="/images/EML.svg" alt="EmporioLambda" boxSize="300" /></Box>
    <Spacer minW="30px" />
    <HStack spacing="10px">
      <Button as="a">Products</Button>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Categories</MenuButton>
        <MenuList>
          <MenuGroup title="Category A">
            <MenuItem>Cat1</MenuItem>
            <MenuItem>Cat2</MenuItem>
            <MenuItem>Cat3</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Category B">
            <MenuItem>Cat1</MenuItem>
            <MenuItem>Cat2</MenuItem>
            <MenuItem>Cat3</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </HStack>
    <Spacer minW="40px" />
    <InputGroup>
      <Input placeholder="Search products..." />
      <InputRightElement>
        <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
      </InputRightElement>
    </InputGroup>
    <Spacer minW="40px" />
    <HStack mr={2} spacing="10px">
      <IconButton aria-label="Cart" icon={<StarIcon />} />

      <Button as="a">Sign in</Button>
      <Button as="a">Sign up</Button>
    </HStack>
  </Flex>
);

export default Header;
