// import '@styles/globals.css';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import 'swiper/swiper-bundle.css';
import '@components/home/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
