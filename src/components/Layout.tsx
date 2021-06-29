import React, { ReactNode } from 'react';
import Head from 'next/head';
// import { signIn, signOut, useSession } from 'next-auth/client';
import { Stack, Flex } from '@chakra-ui/layout';
import Header from '@components/header/Header';
import Footer from '@components/Footer';

type Props = {
  children: ReactNode
  title: string
};

const Layout = ({ children, title = 'EmporioLambda' }: Props) => (
// const [session] = useSession();
  <Stack spacing="2">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
    <Header />
    <Flex as="main" justifyContent='center'>{children}</Flex>
    <Footer />
  </Stack>
);
export default Layout;
