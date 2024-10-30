import React from 'react';
import Link from 'next/link';
import ApplicationLogo from '@/components/ApplicationLogo';
import AuthCard from './AuthCard';

export const metadata = {
  title: 'CRM Authentication',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background">
      <div className="text-gray-900 antialiased">
        <AuthCard
          logo={
            <Link href="/">
              <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
            </Link>
          }
        >
          {children}
        </AuthCard>
      </div>
    </div>
  );
};

export default Layout;
