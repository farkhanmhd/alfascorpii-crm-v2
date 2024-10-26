import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    uuid: string;
    username: string;
    name?: string | null | undefined;
    status: string;
  }

  interface Session {
    data: {
      accessToken: string;
      user: User & DefaultSession['user'];
    };
  }

  interface Account {
    provider: string;
    providerAccountId: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
