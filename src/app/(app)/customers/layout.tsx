'use client';

import React from 'react';
import CustomerFilter from './filters';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[calc(100dvh-48px)] flex-col overflow-hidden">
      {children}
      <CustomerFilter />
    </div>
  );
};

export default Layout;
