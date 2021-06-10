import React from 'react';
import { Flex, HStack } from '@chakra-ui/layout';
import {
  Button, Image, IconButton, Input, InputGroup, InputRightElement,
  Spacer, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Box, useMediaQuery,

} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/client';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { IoExitOutline, IoEnterOutline } from 'react-icons/io5';

const Header = () => {
  const [session] = useSession();
  return (
    <Flex flexWrap={['wrap','wrap','nowrap','nowrap']} h={['full', 'full', '20', '20']} borderBottomWidth={1} borderBottomColor="red" justify="space-between" align="center" wrap="nowrap">
          <Box as="a" href="/" ml="2" minW="200"><Image src="/images/EML.svg" alt="EmporioLambda" w="100"/></Box>
      <Spacer minW="30px" />
      <HStack spacing="10px">
        <Button as="a" href="/products">Products</Button>
        {/* <Menu>
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
        </Menu> */}
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
          leftIcon={<AiOutlineShoppingCart size={20} />}
        >
          Cart
        </Button>

        {session && (
        <Button
          as="a"
          href="/profile/profileDashboard"
          leftIcon={<AiOutlineUser size={20} />}
        >
          Profile
        </Button>
        )}

        {!session && (
        <Button
          leftIcon={<IoEnterOutline size={20} />}
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
          leftIcon={<IoExitOutline size={20} />}
        >
          Sign out
        </Button>
        )}
      </HStack>

    </Flex>
  );
};

export default Header;
