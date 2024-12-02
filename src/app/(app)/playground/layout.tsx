'use client';

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  table: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, table }) => {
  return (
    <div className="grid h-full max-h-[calc(100dvh-48px)] grid-rows-[auto_1fr]">
      {children}
      {table}
    </div>
  );
};

export default Layout;
