'use client';

import clsx from 'clsx';
import useSidebarDesktop from '@/hooks/useSidebarDesktop';
import Sidenav from '@/components/fragments/sidenav';
import SectionHeader from '@/components/fragments/header/SectionHeader';

export default function Template({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useSidebarDesktop();
  return (
    <>
      <Sidenav />
      <section
        className={clsx('min-h-screen w-screen pl-[110px] pr-6 duration-300', {
          'xl:pl-[335px]': sidebarOpen,
        })}
      >
        <SectionHeader />
        <article className="h-[calc(100vh-88px)]">{children}</article>
      </section>
    </>
  );
}
