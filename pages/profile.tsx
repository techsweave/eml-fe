import { signIn, signOut, useSession } from 'next-auth/client'
import Layout from '../components/layout'
export default function auth() {
    const [session, loading] = useSession();
    if (!session)
        return (
            <Layout title="Profile page">
                <p>User not athenticated</p><br />
                <button onClick={(e) => {
                    e.preventDefault()
                    signIn("cognito")
                }}>SignIn</button>
            </Layout>
        )
    return (
        <Layout title="Profile page">
            <p>User athenticated with{session.user.emial}</p><br />
            <button onClick={() => signOut()}>SignOut</button>
        </Layout>

    )
}