import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton as="a" href="https://github.com/techsweave" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
  </ButtonGroup>
)
export default SocialMediaLinks;