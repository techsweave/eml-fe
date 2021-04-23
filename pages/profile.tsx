import { useSession } from 'next-auth/client'
import Layout from '../components/Layout'
export default function auth() {
  const [session, loading] = useSession()
  if (!session) {
    return (
      <Layout title="Profile page - EmporioLambda">
        <p>User not authenticated</p><br />
      </Layout>
    )
  }
  return (
    <Layout title="Profile page - EmporioLambda">
      <p>Hi, {session.user?.email}, welcome on our website <br /></p>
    </Layout>

  )
}
