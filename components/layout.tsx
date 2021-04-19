import Head from 'next/head'
import Link from 'next/Link'
import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'POC First Try' }: Props) => {
  return (
        <div>
            <Head>
                <link rel="icon" href="/EML-Logo.svg" />
                <title>{title}</title>
            </Head>
            <header>
                <div className="logo">
                    <Image src="/images/EML.svg" alt="EmporioLambda Logo" width={2000} height={500} layout="responsive" />
                </div>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/">Products page</Link>
                    <Link href="/">Cart</Link>

                    <Link href="/">Profile</Link>
                    <Link href="/">Login</Link>

                    <input type="text" placeholder="Search.."></input>
                </nav>
            </header>
            <div className="content">{children}</div>
            <footer id="footer">
                <div>
                    <span>Powered by TechSWEave</span>
                </div>
            </footer>
        </div>
  )
}

export default Layout
