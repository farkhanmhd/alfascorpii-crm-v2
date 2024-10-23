import React from 'react';
import { useSidebarDesktop } from '@/hooks';
import { NavLinkProps } from '@/types';
import NavLink from '../navigation/NavLink';

const SideNavLink = (props: Omit<NavLinkProps, 'isOpen'>) => {
  const { sidebarOpen } = useSidebarDesktop();
  return <NavLink {...props} isOpen={sidebarOpen} />;
};

export default SideNavLink;
