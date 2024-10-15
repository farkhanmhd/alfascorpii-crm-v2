import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex max-h-screen overflow-hidden">{children}</main>;
};

export default Layout;
