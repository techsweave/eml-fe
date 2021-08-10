import { Box, Stack, Divider } from '@chakra-ui/react';
import * as React from 'react';
import Copyright from './Copyright';
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => (
  <Box as="footer" role="contentinfo" pl='12' pr='12'>
    <Divider mb='10' />
    <Stack
      direction={{ base: 'column-reverse', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Copyright />
      <SocialMediaLinks />
    </Stack>
  </Box>
);

export default Footer;
