'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/fragments/sidebar';
import { SidebarGroupProps } from '@/components/fragments/sidebar/SidebarGroup';
import Header from '@/components/fragments/header';
import { SessionPayload } from '@/app/lib/actions/auth/session';

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
      { href: '/deal', label: 'Deal' },
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
    .find((link) => link.href === pathname)?.label;
  return (
    <div>
      <Sidebar data={sidebarGroupData} />
      <Header
        headerTitle={headerTitle || 'Dashboard'}
        path={pathname}
        user={session}
      />
      <main className="ml-72 min-h-[calc(100dvh-84px)] rounded-md bg-secondary p-6">
        {children}
      </main>
    </div>
  );
};

export default AuthedLayout;
