import { Box, ButtonGroup, ButtonGroupProps, HStack, IconButton } from '@chakra-ui/react'
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { AuthenticatedUser } from 'utilities-techsweave';

const SocialMediaLinks = (props: ButtonGroupProps) => {
    const session = useSession()[0];
  const [userState, setState] = React.useState<boolean>();

  async function isVendor(s) {
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return user.isVendor(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!);
  }
  useEffect(() => {
    const s = session;
    if (userState !== undefined) return;
    if (!s) return;
    isVendor(s).then(
      (data) => {
        setState(data);
      },
    ).catch(
      (err) => {
        console.log(err.message);
      },
    );
  }, [userState, setState, session]);
  return (
    <HStack>
      <Box hidden={userState ? true : false} >
      <Link   href='/profile/vendorPage'>Contact the vendor</Link>
      </Box>
      <ButtonGroup variant="ghost" color="gray.600" {...props}>
        <IconButton as="a" href="https://github.com/techsweave" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
      </ButtonGroup>
    </HStack>
  )
}
export default SocialMediaLinks;
