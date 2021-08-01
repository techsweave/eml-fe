import React from 'react';
import { Link, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Stack, Box, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { signIn, signOut, useSession } from 'next-auth/client';
import { AiOutlineShoppingCart, AiOutlineForm, AiOutlineUser } from 'react-icons/ai';
import { IoExitOutline, IoEnterOutline } from 'react-icons/io5';
import { BiShoppingBag, BiUser } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs'
import logout from '@pages/api/auth/logout';

const MenuItem = ({ children, to = '/', ...rest }) => (
  <Link href={to}>
    <Text display="block" {...rest}>
      {children}
    </Text>
  </Link>
);

const MenuLinks = ({ isOpen, isVendor }) => {
  const session = useSession()[0];
  return (

    <Box
      display={{ base: isOpen ? 'block' : 'none', md: isOpen ? 'block' : 'none', lg: 'block' }}
      flexBasis={{ base: '100%', md: '100%', lg: 'auto' }}
    >
      <Stack
        align="center"
        justify={['center', 'center', 'center', 'flex-end']}
        direction={['column', 'column', 'column', 'row']}
        pt={[4, 4, 0, 0]}
        mb={['5', '5', '0', '0']}
        mt={['-10', '-10', '0', '0']}
        color='black'
      >
        <MenuItem to={isVendor ? '/products/vendor' : '/products'} display={['inherit', 'inherit', 'inherit', 'none']}>
          <Button bg={['transparent', 'transparent', 'gray.100', 'gray.100']} leftIcon={<BiShoppingBag size={20} />}>Products</Button>
        </MenuItem>
        <MenuItem to="/orders" hidden={isVendor ? undefined : true} display={['inherit', 'inherit', 'inherit', 'none']}>
          <Button bg={['transparent', 'transparent', 'gray.100', 'gray.100']} leftIcon={<BsBook size={20} />}>Orders</Button>
        </MenuItem>
        <MenuItem to="/usersList" hidden={isVendor ? undefined : true} display={['inherit', 'inherit', 'inherit', 'none']}>
          <Button bg={['transparent', 'transparent', 'gray.100', 'gray.100']} leftIcon={<BiUser size={20} />}>Users</Button>
        </MenuItem>
        <MenuItem to="/cart">
          <Button
            hidden={isVendor ? true : undefined}
            bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
            leftIcon={<AiOutlineShoppingCart size={20} />}
          >
            Cart
          </Button>
        </MenuItem>
        <MenuItem to="/manageShop">
          <Button
            hidden={!isVendor ? true : undefined}
            bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
            leftIcon={<AiOutlineForm size={20} />}
          >
            Manage shop
          </Button>
        </MenuItem>
        <MenuItem to="/profile">
          <Button
            hidden={session && !isVendor ? undefined : true}
            bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
            leftIcon={<AiOutlineUser size={20} />}
          >
            Profile
          </Button>
        </MenuItem>
        <MenuItem>

          <Button
            hidden={session ? true : undefined}
            bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
            leftIcon={<IoEnterOutline size={20} />}
            onClick={(e) => {
              e.preventDefault();
              signIn('cognito');
            }}
          >
            Sign in
          </Button>

          <Button
            hidden={!session ? true : undefined}
            bg={['transparent', 'transparent', 'gray.100', 'gray.100']}
            onClick={(e) => {
              e.preventDefault()
              signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/logout` })
            }}
            leftIcon={<IoExitOutline size={20} />}
          >
            Sign out
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
}
export default MenuLinks;
