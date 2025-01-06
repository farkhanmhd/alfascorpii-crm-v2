import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full w-full">
      <div className="hide-scrollbar h-full overflow-auto rounded-lg">
        <div className="min-h-full rounded-lg bg-background">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
