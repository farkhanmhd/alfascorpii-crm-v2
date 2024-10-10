import React from 'react';
import Sidenav from '@/components/fragments/sidenav';
import SectionHeader from '@/components/fragments/header/SectionHeader';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidenav />
      <main className="h-screen w-screen pl-[400px] pt-14">
        <SectionHeader />
        {children}
      </main>
    </>
  );
};

export default Layout;
