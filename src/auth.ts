import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from './app/lib/auth';
import { cookies } from 'next/headers';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await getUser(
          credentials?.username as string,
          credentials?.password as string
        );

        if (!response) {
          throw new Error('User not found');
        }

        const { data } = response;
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
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
});
