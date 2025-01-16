'use client';

import * as React from 'react';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import SidebarHeader from './elements/sidebar/SidebarHeader';

export const HeaderIcon = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarHeader />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
