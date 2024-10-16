'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

interface SubMenuProp {
  href: string;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavLinkSubMenu = ({ href, title, icon, onClick }: SubMenuProp) => {
  const pathname = usePathname();
  const mainPath = pathname.split('/').filter((path) => path !== '')[0];
  const lastPath = pathname.split('/').filter((path) => path !== '')[1];
  const activeLink =
    pathname === '/'
      ? href === '/'
      : mainPath.split('-').join(' ') === title.toLowerCase() ||
        lastPath === title.toLowerCase();
  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        'flex max-w-[200px] items-center gap-x-4 rounded-xl py-3 pl-[30px] text-sm duration-300',
        {
          'text-primary': activeLink,
          'text-black hover:text-primary dark:text-white dark:hover:text-primary':
            !activeLink,
        }
      )}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </Link>
  );
};

export default NavLinkSubMenu;
