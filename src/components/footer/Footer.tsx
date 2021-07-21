import { Box, Stack, StackDivider, Divider } from '@chakra-ui/react'
import * as React from 'react'
import { Copyright } from './Copyright'
import { LinkGrid } from './LinkGrid'
import { Logo } from './Logo'
import { SocialMediaLinks } from './SocialMediaLinks'
import { SubscribeForm } from './SubscribeForm'
const Footer = () => (
  <Box as="footer" role="contentinfo" mx="auto" py="12" px={{ base: '4', md: '8' }}>
    <Divider mb='10'/>
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