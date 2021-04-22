import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import layoutStyles from '../styles/Layout.module.css'
import { ReactNode } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'POC First Try' }: Props) => {
    const [session, loading] = useSession()
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
            </Head>
            <header>
                <div className="logo">
                    <Image src="/images/EML.svg" alt="EmporioLambda Logo" width={2000} height={500} layout="responsive" />
                </div>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/products">Products page</Link>
                    <Link href="/cart">Cart</Link>

                    <Link href="/profile">Profile</Link>
                    {!session && (
                        <span><button id="loginButton" onClick={(e) => {
                            e.preventDefault()
                            signIn('cognito')
                        }}>Sign-In</button></span>
                    )}
                    {session && (
                        <button id="loginButton" onClick={() => signOut()}>Sign-Out</button>
                    )}
                </nav>
                {/* <input type="text" placeholder="Search.."></input> */}
            </header>
            <div className="content"><h1 className={layoutStyles.title}>{title}</h1>{children}</div>
            <footer id="footer">
                <div>
                    <span>Powered by TechSWEave</span>
                </div>
            </footer>
        </div>
    )
}

export default Layout
