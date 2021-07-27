import { Box, Stack, Divider } from '@chakra-ui/react';
import * as React from 'react';
import Copyright from './Copyright';
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => (
  <Box as="footer" role="contentinfo" mx="auto" py="12" px={{ base: '4', md: '8' }}>
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
