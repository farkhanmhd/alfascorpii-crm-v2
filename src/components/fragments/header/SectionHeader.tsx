'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import useSidebarDesktop from '@/hooks/useSidebarDesktop';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import ThemeToggle from '../toggle/ThemeToggle';
import SearchButton from '../buttons/SearchButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SidebarMenuButton from '../buttons/SidebarMenuButton';

const SectionHeader = () => {
  const { sidebarOpen } = useSidebarDesktop();
  return (
    <header
      className={clsx('flex items-center justify-between bg-background py-6')}
    >
      <div className="flex space-x-4">
        {!sidebarOpen && (
          <div>
            <SidebarMenuButton />
          </div>
        )}
        <Breadcrumbs />
      </div>
      <div>
        <div className="flex space-x-4">
          <SearchButton />
          <ThemeToggle />
          <Link href="/user-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SectionHeader;
