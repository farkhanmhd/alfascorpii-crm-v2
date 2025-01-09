'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/fragments/header';
import { SessionPayload } from '@/app/lib/actions/auth/session';
import Sidebar from '@/components/fragments/sidebar';
import { SidebarGroupProps } from '@/components/fragments/sidebar/SidebarGroup';

const sidebarGroupData: SidebarGroupProps[] = [
  {
    group: 'MENU',
    links: [
      { href: '/follow-up', label: 'Follow Up' },
      { href: '/customers', label: 'Customer' },
      { href: '/deal', label: 'Deal' },
    ],
  },
  {
    group: 'PROSPEK',
    links: [
      { href: '/prospek-follow-up', label: 'Follow Up' },
      { href: '/prospek-customers', label: 'Customer' },
    ],
  },
  {
    group: 'Master Data',
    links: [
      { href: '/dealers', label: 'Dealer' },
      { href: '/leasing', label: 'Leasing' },
      { href: '/customerjobs', label: 'Pekerjaan' },
      { href: '/holidays', label: 'Hari Besar' },
      { href: '/relations', label: 'Relasi' },
      { href: '/degrees', label: 'Pendidikan' },
      { href: '/expenses', label: 'Pengeluaran' },
      { href: '/incomes', label: 'Pendapatan' },
      { href: '/hobbies', label: 'Hobi' },
      { href: '/houseownerships', label: 'Status Rumah' },
      { href: '/motorcycles', label: 'Sepeda Motor' },
      { href: '/fumethod', label: 'Metode Follow Up' },
      { href: '/statusfus', label: 'Status Follow Up' },
      { href: '/detailfu', label: 'Detail Follow Up' },
    ],
  },
];

const AuthedLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionPayload;
}) => {
  const pathname = usePathname();
  const headerTitle = sidebarGroupData
    .flatMap((group) => group.links)
    .find((link) => pathname.startsWith(link.href))?.label;
  return (
    <div className="flex min-h-screen flex-col pt-[84px] lg:flex-row lg:pt-0">
      <Sidebar data={sidebarGroupData} />
      <div className="flex-1">
        <Header
          headerTitle={headerTitle || 'Dashboard'}
          path={pathname}
          user={session}
        />
        <main className="min-h-[100dvh-84px] rounded-md bg-secondary p-6 lg:ml-72 lg:w-[calc(100vw-288px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthedLayout;
