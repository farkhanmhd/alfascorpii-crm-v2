import React from 'react';
import { Metadata } from 'next';
import { ScrollArea } from '@/components/ui/scrollarea';
import { SidebarNav } from './components/sidebar-nav';

export const metadata: Metadata = {
  title: 'Customer',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string | number }>;
}

const SettingsLayout = async ({ children, params }: SettingsLayoutProps) => {
  const { id } = await params;
  const sidebarNavItems = [
    {
      title: 'Customer Data',
      href: `/customers/${id}`,
    },
    {
      title: 'Follow Up',
      href: `/customers/${id}/follow-up`,
    },
  ];
  return (
    <div className="grid h-[calc(100dvh-48px)] flex-1 grid-rows-[auto] gap-y-6 pb-6 lg:px-10">
      <div className="flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <ScrollArea className="flex-1">
          <div className="h-full px-2 lg:max-w-4xl">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SettingsLayout;
