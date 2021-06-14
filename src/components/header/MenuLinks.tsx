import React from 'react';
import { Link, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Stack, Box } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { IoExitOutline, IoEnterOutline } from 'react-icons/io5';
import { BiShoppingBag } from 'react-icons/bi';

const MenuItem = ({ children, to = '/', ...rest }) => (
  <Link href={to}>
    <Text display="block" {...rest}>
      {children}
    </Text>
  </Link>
);

const MenuLinks = ({ isOpen, session }) => (
  <Box
    display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
    flexBasis={{ base: '100%', md: 'auto' }}
  >
    <Stack
      align="center"
      justify={['center', 'center', 'flex-end', 'flex-end']}
      direction={['column', 'column', 'row', 'row']}
      pt={[4, 4, 0, 0]}
      mb={['5', '5', '0', '0']}
      mt={['-10', '-10', '0', '0']}
      color='black'
    >
      <MenuItem to="/products" display={['inherit', 'inherit', 'none', 'none']}>
        <Button bg={['transparent', 'transparent', 'gray.100', 'gray.100']} leftIcon={<BiShoppingBag size={20} />}>Products</Button>
      </MenuItem> 
      <MenuItem to="/cart">
        <Button
          bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
          leftIcon={<AiOutlineShoppingCart size={20} />}
        >
          Cart
        </Button>
      </MenuItem>
       <MenuItem to="/profile/profileDashboard">
        {session && (
        <Button
          bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
          leftIcon={<AiOutlineUser size={20} />}
        >
          Profile
        </Button>
        )}
      </MenuItem> 
      <MenuItem>
        {!session && (
        <Button
          bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
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
          bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
          onClick={() => signOut()}
          leftIcon={<IoExitOutline size={20} />}
        >
          Sign out
        </Button>
        )}
      </MenuItem>
    </Stack>
  </Box>
);
export default MenuLinks;
