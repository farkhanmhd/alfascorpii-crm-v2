import React from 'react';
import Sidenav from '@/components/fragments/sidenav';
import SectionHeader from '@/components/fragments/header/SectionHeader';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex max-h-screen overflow-hidden">
      <Sidenav />
      <section className="sticky min-h-screen w-[calc(100vw-324px)]">
        <SectionHeader />
        <article className="h-[calc(100vh-100px)] px-6">{children}</article>
      </section>
    </main>
  );
};

export default Layout;
