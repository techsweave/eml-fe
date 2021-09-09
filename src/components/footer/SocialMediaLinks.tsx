import { ButtonGroup, ButtonGroupProps, HStack, IconButton } from '@chakra-ui/react'
import Link from 'next/link';
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const SocialMediaLinks = (props: ButtonGroupProps) => (
  <HStack>
    <Link href='/profile/vendorPage'>Contact the vendor</Link>
    <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton as="a" href="https://github.com/techsweave" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
    </ButtonGroup>
  </HStack>
)
export default SocialMediaLinks;
