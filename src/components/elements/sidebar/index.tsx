'use client';

import React, { useState, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Menu, X, LayoutDashboard, Users } from 'lucide-react';
import MapItems from '@/utils/MapItems';
import { useMobile } from '@/hooks';
import useClickOutside from '@/hooks/useClickOutside';
import SidebarLink from './SidebarLink';
import SidebarHeader from './SidebarHeader';
import SidebarGroup, { SidebarGroupProps } from './SidebarGroup';

const Sidebar = ({ data }: { data: SidebarGroupProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  const sidebarRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside([sidebarRef, toggleButtonRef], closeSidebar);

  return (
    <>
      {isMobile && (
        <Button
          ref={toggleButtonRef}
          variant="ghost"
          size="icon"
          className="fixed left-4 top-[22px] z-[60] lg:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? <X /> : <Menu />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 flex h-dvh w-72 flex-col gap-y-4 bg-white shadow-md transition-transform duration-300 ease-in-out lg:shadow-none ${
          isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'
        } lg:translate-x-0`}
      >
        <SidebarHeader />
        <ScrollArea className="h-[calc(100dvh-109px)] w-full overflow-auto pb-6">
          <div className="flex flex-col gap-y-2">
            <div>
              <SidebarLink
                href="/"
                label="Dashboard"
                onLinkClick={closeSidebar}
                icon={<LayoutDashboard />}
              />
            </div>
            <MapItems
              of={data}
              render={(item) => (
                <SidebarGroup
                  key={item.group}
                  {...item}
                  onLinkClick={closeSidebar}
                  icon={item.icon}
                />
              )}
            />
            <div>
              <SidebarLink
                href="/staff"
                label="Staff"
                onLinkClick={closeSidebar}
                icon={<Users />}
              />
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
