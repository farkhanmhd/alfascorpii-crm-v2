import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    user: {
      uuid: string;
      username: string;
      name?: string | null | undefined;
      status: string;
      permissions: string[];
    };
  }

  interface Session {
    user: {
      uuid: string;
      username: string;
      name?: string | null | undefined;
      status: string;
      permissions: string[];
    } & DefaultSession['user'];
  }

  interface Account {
    provider: string;
    providerAccountId: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}
