import React, { ReactNode } from 'react';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/client';
import { VStack, Flex } from '@chakra-ui/layout';
import Header from '@components/Header';
import Footer from '@components/Footer';

type Props = {
  children: ReactNode
  title: string
};

const Layout = ({ children, title = 'EmporioLambda' }: Props) => {
  const [session] = useSession();
  return (
    <VStack>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <Header />
      <Flex as="main" />
      <Footer />
    </VStack>

  // <div>
  //       <Link href="/profile">Profile</Link>
  //       {!session && (
  //         <span>
  //           <button
  //             id="loginButton"
  //             type="button"
  //             onClick={(e) => {
  //               e.preventDefault();
  //               signIn('cognito');
  //             }}
  //           >
  //             Sign-In
  //           </button>
  //         </span>
  //       )}
  //       {session && (
  //         <span><button id="loginButton" type="button" onClick={() => signOut()}>Sign-Out</button></span>
  //       )}
  //     </nav>
  //     {/* <input type="text" placeholder="Search.."></input> */}
  //   </header>
  //   <div className="content">
  //     <h1 className={layoutStyles.title}>{title}</h1>
  //     {children}
  //   </div>
  //   <footer id="footer">
  //     <div>
  //       <span>Powered by TechSWEave</span>
  //     </div>
  //   </footer>
  // </div>
  );
};

export default Layout;
