'use client';

import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavItem } from '@/types';

const NavLink = ({ href, icon, title, onClick }: NavItem) => {
  const pathname = usePathname();
  return (
    <Link
      className={clsx({
        'text-primary': pathname === href,
      })}
      href={href ?? ''}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="sr-only">{title}</span>
    </Link>
  );
};

export default NavLink;
