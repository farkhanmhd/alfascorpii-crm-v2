'use client';

import React from 'react';
import { useMobileSidenav } from '@/hooks';
import { NavLinkProps } from '@/types';
import NavLink from '../navigation/NavLink';

const MobileNavLink = (props: Omit<NavLinkProps, 'isOpen'>) => {
  const { mobileSidenav } = useMobileSidenav();
  return <NavLink {...props} isOpen={mobileSidenav} />;
};

export default MobileNavLink;
