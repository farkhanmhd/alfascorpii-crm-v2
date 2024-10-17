'use client';

import React from 'react';
import clsx from 'clsx';
import useMobile from '@/hooks/useMobile';
import useSidebarDesktop from '@/hooks/useSidebarDesktop';
import Sidenav from '@/components/fragments/sidenav';
import MobileNav from '@/components/fragments/mobilenav';
import SectionHeader from '@/components/fragments/header/SectionHeader';
import MobileSidenav from '@/components/fragments/mobilenav/MobileSidenav';
import Breadcrumbs from '@/components/fragments/breadcrumbs/Breadcrumbs';

const Template = ({ children }: { children: React.ReactNode }) => {
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
        {isMobile ? (
          <div className="flex h-20 items-center border-b-primary px-6 text-xl font-black">
            <Breadcrumbs />
          </div>
        ) : (
          <SectionHeader />
        )}
        <article
          className={clsx({
            'h-[calc(100dvh-160px)] pl-6': isMobile,
            'h-[calc(100dvh-88px)]': !isMobile,
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
};

export default Template;
