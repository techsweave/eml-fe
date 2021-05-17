import '@styles/globals.css';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
