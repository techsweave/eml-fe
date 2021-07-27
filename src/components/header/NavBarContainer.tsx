import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/layout';

type Props = {
  children: ReactNode
};
const NavBarContainer = ({ children, ...props }: Props) => (
  <Flex
    h={['full', 'full', 'full', '20']}
    as="nav"
    align="center"
    justify="space-between"
    wrap={['wrap', 'wrap', 'wrap', 'nowrap']}
    w="100%"
    pl='8'
    pr='8'
    {...props}
  >
    {children}
  </Flex>
);
export default NavBarContainer;
