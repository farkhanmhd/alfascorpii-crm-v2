'use client';

import React from 'react';
import clsx from 'clsx';
import useMobileSidenav from '@/hooks/useMobileSidenav';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { MobileSidenavItems } from './constants';

const MobileSidenav = () => {
  const { mobileSidenav } = useMobileSidenav();

  return (
    <aside
      className={clsx(
        'fixed top-0 z-50 flex h-[calc(100vh-80px)] w-screen flex-col justify-between overflow-hidden bg-background px-3 py-6 font-medium text-gray-400 duration-300',
        {
          'left-0': mobileSidenav,
          'left-[-100vw]': !mobileSidenav,
        }
      )}
    >
      <div className="flex flex-col gap-y-16">
        <div
          className={clsx('relative flex items-center', {
            'justify-between': mobileSidenav,
            'justify-center': !mobileSidenav,
          })}
        >
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <NavLinks items={MobileSidenavItems} />
      </div>
      <button
        type="button"
        className={clsx('flex items-center', {
          'px-9': mobileSidenav,
          'justify-center': !mobileSidenav,
        })}
      >
        <div className="flex gap-x-6 rounded-xl py-3 text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
          <LogOut />
          <span className="w-max">Logout</span>
        </div>
      </button>
    </aside>
  );
};

export default MobileSidenav;
