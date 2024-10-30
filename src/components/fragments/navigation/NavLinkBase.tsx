'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { NavLinkBaseProps } from '@/types';

const NavLinkBase = ({
  href,
  title,
  icon,
  onClick,
  isOpen,
  isSubMenu = false,
  show = true,
}: NavLinkBaseProps) => {
  const pathname = usePathname();
  const mainPath = pathname.split('/').filter((path) => path !== '')[0];
  const lastPath = pathname.split('/').filter((path) => path !== '')[1];

  const activeLink = () => {
    if (pathname === '/') {
      return href === '/';
    }

    const isActive = mainPath.split('-').join(' ') === title.toLowerCase();
    if (isSubMenu) {
      return isActive || lastPath === title.toLowerCase();
    }

    return isActive;
  };

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        'flex items-center gap-x-4 rounded-xl py-3 duration-300',
        {
          'text-primary': activeLink(),
          'text-black hover:text-primary dark:text-white dark:hover:text-primary':
            !activeLink(),
          'max-w-[200px] pl-[30px]': isSubMenu,
          'px-8': isOpen && !isSubMenu,
          'justify-center': !isOpen && !isSubMenu,
        }
      )}
    >
      <span>{icon}</span>
      {show && <span className="text-sm">{title}</span>}
    </Link>
  );
};

export default NavLinkBase;
