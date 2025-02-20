import React from 'react';
import AuthedLayout from '@/components/AuthedLayout';
import { JWTPayload } from 'jose';
import { getSession } from '../lib/actions/auth/session';
import { getUserPermissions } from '../lib/data/auth';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session: JWTPayload | null = await getSession();
  const id = session?.userId;
  const permissions = await getUserPermissions(id as string);

  const user = {
    name: session?.name as string,
    username: session?.username as string,
    role: session?.role as string,
  };
  return (
    <AuthedLayout user={user} permissions={permissions}>
      {children}
    </AuthedLayout>
  );
};

export default Layout;
