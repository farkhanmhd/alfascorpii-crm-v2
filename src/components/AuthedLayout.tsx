'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FileText, Layers, Phone } from 'lucide-react';
import Header from '@/components/elements/header';
import Sidebar from '@/components/elements/sidebar';
import { SidebarGroupProps } from '@/components/elements/sidebar/SidebarGroup';
import { usePermissions } from '@/hooks';
import { Session } from 'next-auth';

const sidebarGroupData: SidebarGroupProps[] = [
  {
    group: 'Sales',
    icon: <FileText />,
    links: [
      { href: '/follow-up', label: 'Follow Up' },
      { href: '/customers', label: 'Customer' },
      { href: '/deal', label: 'Deal' },
    ],
  },
  {
    group: 'Prospek',
    icon: <Phone />,
    links: [
      { href: '/prospek-follow-up', label: 'Follow Up' },
      { href: '/prospek-customers', label: 'Customer' },
    ],
  },
  {
    group: 'Master Data',
    icon: <Layers />,
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
      { href: '/detailfu', label: 'Keterangan Follow Up' },
      { href: '/furesult', label: 'Hasil Follow Up' },
    ],
  },
];

const AuthedLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  const { setPermissions } = usePermissions();
  useEffect(() => {
    setPermissions(session?.user?.permissions);
  }, [session?.user?.permissions]);

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
          user={session?.user}
        />
        <main className="min-h-[100dvh-84px] rounded-md bg-secondary p-6 lg:ml-72 lg:w-[calc(100vw-288px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthedLayout;
