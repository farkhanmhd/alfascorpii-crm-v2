import React from 'react';
import { auth } from '@/auth';
import AuthedLayout from '@/components/AuthedLayout';
import { Session } from 'next-auth';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return <AuthedLayout session={session as Session}>{children}</AuthedLayout>;
};

export default Layout;
