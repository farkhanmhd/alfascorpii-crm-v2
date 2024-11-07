import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { getUser } from './app/lib/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const data = await getUser(
          credentials?.username as string,
          credentials?.password as string
        );

        if (!data) {
          throw new Error('User not found');
        }
        const cookieStore = await cookies();

        cookieStore.set('at', data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60,
        });
        return data;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      const cookieStore = await cookies();
      const tokenValue = cookieStore.get('at');

      if (!tokenValue) {
        throw new Error('No authentication token found');
      }

      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 2592000,
  },
});
