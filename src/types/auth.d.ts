import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    user: {
      uuid: string;
      username: string;
      name?: string | null | undefined;
      status: string;
    };
  }

  interface Session {
    accessToken: string;
    user: {
      uuid: string;
      username: string;
      name?: string | null | undefined;
      status: string;
    } & DefaultSession['user'];
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
    user: User;
  }
}
