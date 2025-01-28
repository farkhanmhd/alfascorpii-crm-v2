import React from 'react';
import AuthedLayout from '@/components/AuthedLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthedLayout>{children}</AuthedLayout>;
};

export default Layout;
