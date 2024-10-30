'use client';

import React, { useRef } from 'react';
import clsx from 'clsx';
import { useSidebarDesktop } from '@/hooks';
import useClickOutside from '@/hooks/useClickOutside';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import SideNavLinks from './SideNavLinks';
import { Logo } from '../navigation/Logo';
import SidebarMenuButton from '../buttons/SidebarMenuButton';
import { NavItems } from '../navigation/constants';

const Sidenav = () => {
  const sidenavRef = useRef<HTMLBaseElement>(null);
  const { sidebarOpen, setSidebarOpen } = useSidebarDesktop();

  useClickOutside(sidenavRef, () => {
    if (window.innerWidth < 1280) {
      setSidebarOpen(false);
    }
  });

  return (
    <aside
      ref={sidenavRef}
      className={clsx(
        'fixed left-0 top-0 z-50 flex h-screen flex-col justify-between overflow-hidden border-r bg-background px-3 py-6 font-medium text-gray-400 duration-300',
        {
          'w-[325px]': sidebarOpen,
          'w-[100px]': !sidebarOpen,
        }
      )}
    >
      <div className="flex flex-col gap-y-16">
        <div
          className={clsx('relative flex items-center', {
            'justify-between': sidebarOpen,
            'justify-center': !sidebarOpen,
          })}
        >
          <Link href="/">
            <Logo />
          </Link>
          {sidebarOpen && <SidebarMenuButton />}
        </div>
        <SideNavLinks items={NavItems} />
      </div>
      <button
        type="button"
        className={clsx('flex items-center', {
          'px-9': sidebarOpen,
          'justify-center': !sidebarOpen,
        })}
        onClick={() => signOut()}
      >
        <div className="flex gap-x-6 rounded-xl py-3 text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
          <LogOut />
          {sidebarOpen && <span className="w-max">Logout</span>}
        </div>
      </button>
    </aside>
  );
};

export default Sidenav;
