import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from './app/lib/auth';

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
        return data;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      return { ...session, ...token };
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
