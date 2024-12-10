import React from 'react';
import TemplateProvider from './TemplateProvider';
import { getSession } from '../lib/actions/auth/session';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  console.log(session);
  return (
    <div className="max-h-screen overflow-hidden">
      <TemplateProvider session={session}>{children}</TemplateProvider>
    </div>
  );
};

export default Layout;
