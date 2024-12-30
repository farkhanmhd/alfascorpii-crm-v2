import MapItems from '@/utils/MapItems';
import React from 'react';
import { ScrollArea } from '@/components/ui/scrollarea';
import SidebarLink from './SidebarLink';
import SidebarHeader from './SidebarHeader';
import SidebarGroup, { SidebarGroupProps } from './SidebarGroup';

const Sidebar = ({ data }: { data: SidebarGroupProps[] }) => {
  return (
    <aside className="fixed left-0 top-0 flex h-dvh w-72 flex-col gap-y-4 bg-sidebar font-semibold">
      <SidebarHeader />
      <ScrollArea className="h-[calc(100dvh-109px)] pb-6">
        <div className="flex flex-col gap-y-4">
          <SidebarLink href="/" label="Dashboard" />
          <MapItems
            of={data}
            render={(item) => <SidebarGroup key={item.group} {...item} />}
          />
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
