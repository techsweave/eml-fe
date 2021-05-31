import React, { ReactNode } from 'react';
import Head from 'next/head';
// import { signIn, signOut, useSession } from 'next-auth/client';
import { VStack, Flex } from '@chakra-ui/layout';
import Header from '@components/Header';
import Footer from '@components/Footer';

type Props = {
  children: ReactNode
  title: string
};

const Layout = ({ children, title = 'EmporioLambda' }: Props) => (
// const [session] = useSession();
  <VStack h="100vh" spacing="5">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
    <Header />
    <Flex as="main" h="full">{children}</Flex>
    <Footer />
  </VStack>
);
export default Layout;
