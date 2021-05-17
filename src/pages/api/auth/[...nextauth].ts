import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Cognito({
            clientId: process.env.COGNITO_CLIENT_ID,
            domain: process.env.COGNITO_DOMAIN
        })
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // Add access_token to the token right after signin
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            return token
        },
        async session(session, token) {
            // Add property to session, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    }
})
