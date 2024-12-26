import MapItems from '@/utils/MapItems';
import React from 'react';
import SidebarLink from './SidebarLink';
import SidebarHeader from './SidebarHeader';
import SidebarGroup, { SidebarGroupProps } from './SidebarGroup';

const Sidebar = ({ data }: { data: SidebarGroupProps[] }) => {
  return (
    <aside className="fixed left-0 top-0 flex h-dvh w-64 flex-col gap-y-4 bg-sidebar font-semibold">
      <SidebarHeader />
      <SidebarLink href="/" label="Dashboard" />
      <MapItems
        of={data}
        render={(item) => <SidebarGroup key={item.group} {...item} />}
      />
    </aside>
  );
};

export default Sidebar;
