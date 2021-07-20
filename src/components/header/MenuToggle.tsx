import React from 'react';
import { Box } from '@chakra-ui/layout';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

type Props = {
  toggle,
  isOpen
};
const MenuToggle = ({ toggle, isOpen }:Props) => (
  <Box display={{ base: 'block', md: 'block', lg: 'none' }} onClick={toggle}>
    {isOpen ? <CloseIcon w={19} h={19} /> : <HamburgerIcon w={30} h={30} />}
  </Box>
);
export default MenuToggle;
