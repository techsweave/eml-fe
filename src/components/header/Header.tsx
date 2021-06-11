import React from 'react';
import {
  Button, Image, IconButton, Input, InputGroup, InputRightElement,
  Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/client';
import MenuToggle from '@components/header/MenuToggle';
import MenuLinks from '@components/header/MenuLinks';
import NavBarContainer from '@components/header/NavBarContainer';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [session] = useSession();

  const toggle = () => setIsOpen(!isOpen);
  return (
    <NavBarContainer {...props}>
      <Box as="a" href="/" ml="2" minW="200"><Image src="/images/EML.svg" alt="EmporioLambda" w={['200px', '200px', '300', '300']} h={['100', '100', '300', '300']} /></Box>
      <Button as="a" href="/products" display={['none', 'none', 'inherit', 'inherit']} w='200px' bg='grey' ml='10'>Products</Button>
      <InputGroup display={['none', 'none', 'inherit', 'inherit']} ml='10' mr='10'>
        <Input placeholder="Search products..." />
        <InputRightElement>
          <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
        </InputRightElement>
      </InputGroup>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} session={session} />
      <InputGroup display={['inherit', 'inherit', 'none', 'none']} mb='5'>
        <Input placeholder="Search products..." />
        <InputRightElement>
          <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
        </InputRightElement>
      </InputGroup>
    </NavBarContainer>
  );
};

export default NavBar;
