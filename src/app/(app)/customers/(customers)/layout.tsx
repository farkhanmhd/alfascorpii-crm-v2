'use client';

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[calc(100dvh-48px)] flex-col overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
