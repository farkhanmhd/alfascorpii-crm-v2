import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from './app/lib/data/auth';
import { storeToken } from './app/lib/actions/auth/session';
import { getUserPermissions } from './app/lib/actions/staff';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const data = await getUser(
          credentials.username as string,
          credentials.password as string
        );

        if (!data) {
          throw new Error('Invalid username or password');
        }

        const { uuid: userId, name, username, status } = data.user;
        const { accessToken } = data;

        await storeToken(accessToken);

        const permissions = await getUserPermissions();

        const user = {
          user: {
            uuid: userId,
            name,
            username,
            status,
            permissions,
          },
        };

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      const user = token.user as User;

      return { ...session, user };
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
