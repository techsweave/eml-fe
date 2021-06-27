import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

async function refreshAccessToken(token) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.COGNITO_CLIENT_ID as string,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    });

    const url = `https://${process.env.COGNITO_DOMAIN}/oauth2/token?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // Fall back to old refresh token
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      domain: process.env.COGNITO_DOMAIN,
      idToken: true,
      scope: 'openid profile email aws.cognito.signin.user.admin',
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile) {
      // Initial sign in
      if (account && user) {
        // Max 4096 bytes
        return {
          accessToken: account.accessToken,
          idToken: account.idToken,
          // accessTokenExpires: Date.now() + account.expires_in! * 1000,
          // refreshToken: account.refresh_token,
          // user,
          // profile,
        };
      }
      return token;

      // TODO:
      // // Return previous token if the access token has not expired yet
      // if (Date.now() < (token.accessTokenExpires as number)) {
      //   return token;
      // }

      // // Access token has expired, try to update it
      // return refreshAccessToken(token);
    },
    async session(session, token) {
      const sessionToken = session;
      sessionToken.accessToken = token.accessToken;
      sessionToken.idToken = token.idToken;
      // sessionToken.profile = token.profile;
      return sessionToken;
    },
  },
});
