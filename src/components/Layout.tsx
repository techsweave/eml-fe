import React, { ReactNode } from 'react';
import Head from 'next/head';
import {
  Stack, Flex, Divider,
} from '@chakra-ui/react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';

type Props = {
  children: ReactNode
  title: string
  search?: string
};

const Layout = ({ children, title = 'EmporioLambda', search }: Props) => (

  <Stack spacing="2">
    <Stack minH='calc(100vh - 115px)'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <Header search={search} />
      <Divider mb='10' />
      <Flex
        as="main"
        justifyContent='center'
        justifySelf='stretch'
        mb='10vh'
      >
        {children}
      </Flex>
    </Stack>
    <Footer />
  </Stack>
);

Layout.defaultProps = {
  search: undefined,
};

export default Layout;
