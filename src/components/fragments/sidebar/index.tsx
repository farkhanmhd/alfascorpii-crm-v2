'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import MapItems from '@/utils/MapItems';
import { useMobile } from '@/hooks';
import { useOutsideClick } from '@/hooks/use-outside-click';
import SidebarLink from './SidebarLink';
import SidebarHeader from './SidebarHeader';
import SidebarGroup, { SidebarGroupProps } from './SidebarGroup';

const Sidebar = ({ data }: { data: SidebarGroupProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const sidebarRef = useOutsideClick(() => {
    if (isMobile && isOpen) {
      closeSidebar();
    }
  });

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-5 z-[60] lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-[60] flex h-dvh w-72 flex-col gap-y-4 bg-sidebar font-semibold shadow-md transition-transform duration-300 ease-in-out lg:shadow-none ${
          isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'
        } lg:translate-x-0`}
      >
        <SidebarHeader />
        <ScrollArea className="h-[calc(100dvh-109px)] pb-6">
          <div className="flex flex-col gap-y-4">
            <SidebarLink
              href="/"
              label="Dashboard"
              onLinkClick={closeSidebar}
            />
            <MapItems
              of={data}
              render={(item) => (
                <SidebarGroup
                  key={item.group}
                  {...item}
                  onLinkClick={closeSidebar}
                />
              )}
            />
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
