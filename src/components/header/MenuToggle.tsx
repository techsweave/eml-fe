import React from 'react';
import { Box } from '@chakra-ui/layout';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

type Props = {
  toggle,
  isOpen
};
const MenuToggle = ({ toggle, isOpen }:Props) => (
  <Box display={{ base: 'block', md: 'block', lg: 'none' }} onClick={toggle}>
    {isOpen ? <CloseIcon /> : <HamburgerIcon />}
  </Box>
);
export default MenuToggle;
