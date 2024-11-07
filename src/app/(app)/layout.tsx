import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-h-screen overflow-hidden">{children}</div>;
};

export default Layout;
