import { signIn, signOut, useSession } from 'next-auth/client'
import Layout from '../components/layout'
export default function auth() {
    const [session, loading] = useSession();
    if (!session)
        return (
            <Layout title="Profile page - EmporioLambda">
                <p>User not authenticated</p><br />
                <button onClick={(e) => {
                    e.preventDefault()
                    signIn("cognito")
                }}>Sign-In</button>
            </Layout>
        )
    return (
        <Layout title="Profile page - EmporioLambda">
            <p>User authenticated with the following email: {session.user.email}<br /></p>
            <button onClick={() => signOut()}>Sign-Out</button>
        </Layout>

    )
}