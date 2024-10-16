'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import useSidebarDesktop from '@/hooks/useSidebarDesktop';
import Link from 'next/link';
import clsx from 'clsx';

const NavLink = ({
  href,
  title,
  icon,
  onClick,
}: {
  href?: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const { sidebarOpen } = useSidebarDesktop();
  const mainPath = pathname.split('/').filter((path) => path !== '')[0];
  const activeLink =
    pathname === '/'
      ? href === '/'
      : mainPath.split('-').join(' ') === title.toLowerCase();

  return (
    <Link
      onClick={onClick}
      href={href ?? '/'}
      className={clsx(
        'flex items-center gap-x-6 rounded-xl py-3 duration-300',
        {
          'bg-primary text-white': activeLink,
          'text-black hover:text-primary dark:text-white dark:hover:text-primary':
            !activeLink,
          'px-8': sidebarOpen,
          'justify-center': !sidebarOpen,
        }
      )}
    >
      <span>{icon}</span>
      {sidebarOpen && <span className="w-min">{title}</span>}
    </Link>
  );
};

export default NavLink;
