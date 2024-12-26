import React from 'react';
import AuthedLayout from '@/components/AuthedLayout';
import { getSession, SessionPayload } from '../lib/actions/auth/session';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  return (
    <AuthedLayout session={session as SessionPayload}>{children}</AuthedLayout>
  );
};

export default Layout;
