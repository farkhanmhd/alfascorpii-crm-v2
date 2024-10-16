'use client';

import clsx from 'clsx';
import useMobile from '@/hooks/useMobile';
import useSidebarDesktop from '@/hooks/useSidebarDesktop';
import Sidenav from '@/components/fragments/sidenav';
import MobileNav from '@/components/fragments/mobilenav';
import SectionHeader from '@/components/fragments/header/SectionHeader';
import MobileSidenav from '@/components/fragments/sidenav/MobileSidenav';
import Breadcrumbs from '@/components/fragments/breadcrumbs/Breadcrumbs';

export default function Template({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useSidebarDesktop();
  const { isMobile } = useMobile();
  return (
    <>
      <section
        className={clsx('w-screen pr-6 duration-300', {
          'pl-0': isMobile,
          'h-screen pl-[110px]': !isMobile,
          'xl:pl-[335px]': sidebarOpen,
        })}
      >
        {!isMobile && <SectionHeader />}
        {isMobile && (
          <div className="flex h-20 items-center px-6 text-2xl font-black">
            <Breadcrumbs />
          </div>
        )}
        <article
          className={clsx({
            'h-[calc(100vh-160px)] pl-6': isMobile,
            'h-[calc(100vh-88px)]': !isMobile,
          })}
        >
          {children}
        </article>
      </section>
      {isMobile ? (
        <>
          <MobileSidenav />
          <MobileNav />
        </>
      ) : (
        <Sidenav />
      )}
    </>
  );
}
