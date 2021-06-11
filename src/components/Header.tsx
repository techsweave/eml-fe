import React from 'react';
import { Flex, HStack } from '@chakra-ui/layout';
import {
  Button, Image, IconButton, Input, InputGroup, InputRightElement,
  Spacer, Menu, MenuButton, MenuList, MenuDivider, MenuGroup, Box, Stack, Link, Text

} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/client';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { IoExitOutline, IoEnterOutline } from 'react-icons/io5';
import { wrap } from 'lodash';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
const [session] = useSession();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
          <Box as="a" href="/" ml="2" minW="200"><Image src="/images/EML.svg" alt="EmporioLambda" w={['200px', '200px', '300', '300']} h={['100', '100', '300', '300']} /></Box>
          <Button as="a" href="/products" display={['none','none','inherit','inherit']} w='200px' bg='grey' ml='10'>Products</Button>
        <InputGroup display={['none','none','inherit','inherit']} ml='10' mr='10'>
        <Input placeholder="Search products..." />
        <InputRightElement>
          <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
        </InputRightElement>
      </InputGroup>
          <MenuToggle toggle={toggle} isOpen={isOpen} />
          <MenuLinks isOpen={isOpen} session={session}/>
            <InputGroup display={['inherit','inherit','none','none']} mb='5'>
        <Input placeholder="Search products..." />
        <InputRightElement>
          <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
        </InputRightElement>
      </InputGroup>
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="black"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen, session}) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
              pt={[4, 4, 0, 0]}
              mb={['5', '5', '0', '0']}
              mt={['-10','-10','0','0']}
              color='black'
      >
        <MenuItem to="/products" display={['inherit','inherit','none','none']}> <Button bg={['transparent','transparent','grey','grey']}>Products</Button></MenuItem>
        <MenuItem to="/cart"><Button bg={['transparent','transparent','grey','grey']}
          leftIcon={<AiOutlineShoppingCart size={20} />}
        >
          Cart
        </Button></MenuItem>
        <MenuItem to="/profile/profileDashboard">{session && (
        <Button bg={['transparent','transparent','grey','grey']}
          leftIcon={<AiOutlineUser size={20} />}
        >
          Profile
        </Button>
        )} </MenuItem>
        <MenuItem>{!session && (
        <Button bg={['transparent','transparent','grey','grey']}
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
        <Button bg={['transparent','transparent','grey','grey']}
          onClick={() => signOut()}
          leftIcon={<IoExitOutline size={20} />}
        >
          Sign out
        </Button>
        )} </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
      <Flex
           h={['full', 'full', '20', '20']} borderBottomWidth={1} borderBottomColor="red"
      as="nav"
      align="center"
      justify="space-between"
      wrap={['wrap','wrap','nowrap','nowrap']}
          w="100%"
          pl='8' pr='8'
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
/*const Header = () => {
    const [session] = useSession();
  return (
    <Flex flexWrap={['wrap','wrap','nowrap','nowrap']} h={['full', 'full', '20', '20']} borderBottomWidth={1} borderBottomColor="red" justify="space-between" align="center" wrap="nowrap">
          <Box as="a" href="/" ml="2" minW="200"><Image src="/images/EML.svg" alt="EmporioLambda" boxSize={['200','200','300','300']} /></Box>
      
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
        </Menu> 
          
      <HStack mr={2} spacing="10px">
        <Button
          as="a"
          href="/cart"
          leftIcon={<AiOutlineShoppingCart size={20} />}
        >
          Cart
        </Button>

        

        
      </HStack>

    </Flex>
  ); */
//};

//export default Header;
