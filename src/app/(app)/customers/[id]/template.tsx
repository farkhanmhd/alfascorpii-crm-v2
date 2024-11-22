'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scrollarea';
import { SidebarNav } from './components/sidebar-nav';

const Template = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const sidebarNavItems = [
    {
      title: 'Customer Data',
      href: `/customers/${id}`,
    },
    {
      title: 'Motorcycle',
      href: `/customers/${id}/motorcycle`,
    },
    {
      title: 'Deals',
      href: `/customers/${id}/deals`,
    },
    {
      title: 'Follow Up',
      href: `/customers/${id}/follow-up`,
    },
  ];
  return (
    <>
      <aside className="lg:w-1/5">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <ScrollArea className="flex-1">
        <div className="h-full px-2 lg:max-w-4xl">{children}</div>
      </ScrollArea>
    </>
  );
};

export default Template;
