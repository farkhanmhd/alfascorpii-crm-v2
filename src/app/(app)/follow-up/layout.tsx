'use client';

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[calc(100dvh-132px)] flex-col lg:h-[calc(100dvh-132px)]">
      {children}
    </div>
  );
};

export default Layout;
