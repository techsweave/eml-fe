import React from 'react';
import {
  Flex, HStack,
} from '@chakra-ui/layout';
import {
  Button, Image, IconButton, Input, InputGroup, InputRightElement,
  Spacer, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Box,

} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/client';

const Header = () => {
  const [session] = useSession();
  return (
    <Flex w="full" h="10vh" borderBottomWidth={1} borderBottomColor="red" justify="space-between" align="center" wrap="nowrap">
      <Box as="a" href="/" ml="2" minW="200"><Image src="/images/EML.svg" alt="EmporioLambda" boxSize="300" /></Box>
      <Spacer minW="30px" />
      <HStack spacing="10px">
        <Button as="a" href="/products">Products</Button>
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
        <Button
          as="a"
          href="/cart"
          leftIcon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
)}
        >
          Cart
        </Button>
        <Button
          as="a"
          href="/profile"
          leftIcon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
)}
        >
          Profile
        </Button>
        {!session && (
        <Button
          leftIcon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
              <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
)}
          onClick={(e) => {
            e.preventDefault();
            signIn('cognito');
          }}
        >
          Sign in
        </Button>
        )}
        {session && (
        <Button
          onClick={() => signOut()}
          leftIcon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
              <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
            </svg>
)}
        >
          Sign out
        </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;
