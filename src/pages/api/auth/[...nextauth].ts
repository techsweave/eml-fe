import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Cookies from 'cookies';

async function refreshAccessToken(token, req, res) {
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

    const cookies = new Cookies(req, res);
    cookies.set('idToken', refreshedTokens.id_token);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in!,
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

const getOptions = (req, res) => ({
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      domain: process.env.COGNITO_DOMAIN,
      idToken: true,
      scope: 'openid profile email aws.cognito.signin.user.admin',
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      // Initial sign in
      if (account && user) {
        const cookies = new Cookies(req, res);
        cookies.set('userId', user.id);
        cookies.set('idToken', account.idToken);
        // Max 4096 bytes
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in!,
          refreshToken: account.refresh_token,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token, req, res);
    },
    async session(session, token) {
      const cookies = new Cookies(req, res);
      const userId = cookies.get('userId');
      const idToken = cookies.get('idToken');

      const sessionToken = session;
      sessionToken.accessToken = token.accessToken;
      sessionToken.idToken = idToken;
      sessionToken.userId = userId;
      return sessionToken;
    },
  },
});

export default (req, res) => NextAuth(req, res, getOptions(req, res));
