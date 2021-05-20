import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      domain: process.env.COGNITO_DOMAIN,
    }),
  ],
  callbacks: {
    async jwt(token, user, account/* , profile, isNewUser */) {
      // profile and isNewUser is commented cause there are unused
      // but they could be used in future
      // Add access_token to the token right after signIn
      const tokenAccess = token;
      if (account?.accessToken) {
        tokenAccess.accessToken = account.accessToken;
      }
      return tokenAccess;
    },
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      const sessionToken = session;
      sessionToken.accessToken = token.accessToken;
      return sessionToken;
    },
  },
});
