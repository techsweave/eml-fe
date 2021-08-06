import React, { ReactNode } from 'react';
import Head from 'next/head';
import {
  Stack, Flex, Divider, Center,
} from '@chakra-ui/react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';

type Props = {
  children: ReactNode
  title: string
  search?: string
};

const Layout = ({ children, title = 'EmporioLambda', search }: Props) => (
  <Center bg='gray'>
    <Stack spacing="2" w={['100%', '100%', '100%', '85%']} bg='white'>
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
      <Footer />
    </Stack>
  </Center>
);

Layout.defaultProps = {
  search: undefined,
};

export default Layout;
