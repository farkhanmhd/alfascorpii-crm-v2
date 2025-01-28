'use client';

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-[calc(100dvh-132px)] flex-col">{children}</div>;
};

export default Layout;
