'use client';

import React from 'react';
import { NavLinkProps } from '@/types';
import NavLinkBase from './NavLinkBase';

const NavLink = ({
  href,
  title,
  icon,
  onClick,
  isOpen,
  showText,
}: NavLinkProps) => {
  return (
    <NavLinkBase
      href={href ?? ''}
      title={title}
      icon={icon}
      onClick={onClick}
      isOpen={isOpen}
      show={showText}
    />
  );
};

export default NavLink;
