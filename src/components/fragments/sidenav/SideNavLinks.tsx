'use client';

import React from 'react';
import { useSidebarDesktop } from '@/hooks';
import { NavItem } from '@/types';
import NavLinks from '../navigation/NavLinks';

const SideNavLinks = ({ items }: { items: NavItem[] }) => {
  const { sidebarOpen } = useSidebarDesktop();
  return <NavLinks items={items} isOpen={sidebarOpen} />;
};

export default SideNavLinks;
