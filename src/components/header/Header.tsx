import React, { useState, useEffect } from 'react';
import {
  Button, Image, IconButton, Input, InputGroup, InputRightElement,
  Box, Link, Text
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import MenuToggle from '@components/header/MenuToggle';
import MenuLinks from '@components/header/MenuLinks';
import NavBarContainer from '@components/header/NavBarContainer';
import { BiShoppingBag } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs'
import SearchBar from '@components/header/SearchBar';
import { AuthenticatedUser } from "utilities-techsweave";
import * as AWS from 'aws-sdk';

const NavBar = (props) => {
  AWS.config.update({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS!
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession()[0];
  const [userState, setState] = useState<boolean>();

  async function isVendor(s) {
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!);
  }

  useEffect(() => {
    const s = session;
    if (userState != undefined) return;
    if (!s) return;
    isVendor(s).then(
      (data) => {
        setState(data);
      }
    ).catch(
      (err) => {
        console.log(err.message);
      }
    )
  }, [userState, setState, session]);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <NavBarContainer {...props}>
      <Box as="a" href="/" ml="2" minW="200" mt={['0','0','5','5']} mb={['0','0','5','5']}><Image src="/images/EML.svg" alt="EmporioLambda" w={['200px', '200px', '100', '300']} h={['100', '100', '50', '100']} /></Box>
      <Link href="/products" display={['none', 'none', 'none', 'inherit']}>
        <Text display="block">
          <Button bg='gray.100' ml='10' leftIcon={<BiShoppingBag size={20} />}>Products</Button>
        </Text>
      </Link>
      <Link href="/orders"  hidden={userState ? undefined : true}>
        <Text display="block">
          <Button  display={['none', 'none', 'none', 'inherit']} bg='gray.100' ml='10' leftIcon={<BsBook size={20} />}>Orders</Button>
        </Text>
      </Link>
      <SearchBar display={['none', 'none', 'none', 'inherit']} ml='10' mr='10' />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} isVendor={userState} />
      <SearchBar display={['inherit', 'inherit', 'inherit', 'none']} mb='5' mt='5'/>
    </NavBarContainer>
  );
};

export default NavBar;
