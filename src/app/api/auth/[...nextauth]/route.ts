import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

interface Credentials {
  username: string;
  password: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }

        try {
          const res = await axios.post('http://localhost:8000/api/v1/login', {
            username: credentials.username,
            password: credentials.password,
          });

          const { data } = res;

          if (data.meta.status === 'success') {
            const { accessToken, user } = data.data;

            return {
              token: accessToken,
              ...user,
            };
          }

          return null;
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'token' in user) {
        return { ...token, accessToken: user.token };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, accessToken: token.accessToken };
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
