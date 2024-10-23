'use client';

import React from 'react';
import { useMobileSidenav } from '@/hooks';
import { NavItem } from '@/types';
import NavLinks from '../navigation/NavLinks';

const MobileSidebar = ({ items }: { items: NavItem[] }) => {
  const { mobileSidenav } = useMobileSidenav();
  return <NavLinks items={items} isOpen={mobileSidenav} isMobile />;
};

export default MobileSidebar;
