'use client';

import React from 'react';
import { SubMenuProp } from '@/types';
import NavLinkBase from './NavLinkBase'; // Import the common component

const NavLinkSubMenu = ({ href, title, icon, onClick }: SubMenuProp) => {
  return (
    <NavLinkBase
      href={href}
      title={title}
      icon={icon}
      onClick={onClick}
      isSubMenu
      show
    />
  );
};

export default NavLinkSubMenu;
