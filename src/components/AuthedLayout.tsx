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
    group: 'SETTINGS',
    links: [
      { href: '/master-data', label: 'MASTER DATA' },
      { href: '/users', label: 'USER LIST' },
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
    <div className="">
      <Sidebar data={sidebarGroupData} />
      <Header
        headerTitle={headerTitle || 'Dashboard'}
        path={pathname}
        user={session}
      />
      <main className="ml-64 rounded-md bg-background p-6">{children}</main>
    </div>
  );
};

export default AuthedLayout;
