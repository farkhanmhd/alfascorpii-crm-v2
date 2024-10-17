'use client';

import React, { useState } from 'react';
import useMobileSidenav from '@/hooks/useMobileSidenav';
import { ScrollArea } from '@/components/ui/scrollarea';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { NavItem } from '@/types';
import MobileNavLink from '../mobilenav/MobileNavLink';
import NavLinkSubMenu from './NavLinkSubMenu';

const MobileNavLinks = ({ items }: { items: NavItem[] }) => {
  const { mobileSidenav, setMobileSidenav } = useMobileSidenav();
  const [openMenu, setOpenMenu] = useState<string | null>(
    localStorage.getItem('openMenu')
  );

  const toggleMenu = (title: string) => {
    setOpenMenu((prevTitle) => (prevTitle === title ? null : title));
    localStorage.setItem('openMenu', title);
  };

  const handleSubmenu = (title: string) => {
    setMobileSidenav(true);
    toggleMenu(title);
  };

  return (
    <nav className="px-3">
      <ul className="flex flex-col gap-y-4">
        {items.map((item: NavItem) =>
          item.isParent ? (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => handleSubmenu(item.title)}
                className={clsx(
                  'flex w-full items-center rounded-xl py-3 duration-300',
                  {
                    'bg-primary text-white hover:bg-primary/80':
                      openMenu === item.title,
                    'text-black hover:text-primary dark:text-white dark:hover:text-primary':
                      openMenu !== item.title,
                    'justify-between px-8': mobileSidenav,
                    'justify-center': !mobileSidenav,
                  }
                )}
              >
                <div className="flex items-center gap-x-4">
                  <span>{item.icon}</span>
                  {mobileSidenav && <span className="w-max">{item.title}</span>}
                </div>
                {mobileSidenav && (
                  <ChevronDown
                    size={16}
                    className={clsx(
                      'font-bold transition-[transform] duration-300 ease-in-out',
                      {
                        'rotate-180': openMenu === item.title,
                      }
                    )}
                  />
                )}
              </button>
              {mobileSidenav && (
                <ScrollArea className="ml-9 mt-2 border-l-2 sm:mr-0">
                  <ul
                    className={clsx('duration-300 ease-in-out', {
                      'max-h-0': openMenu !== item.title,
                      'max-h-[20vh]': openMenu === item.title,
                    })}
                  >
                    {item.childrens?.map((child) => (
                      <li key={child.title}>
                        <NavLinkSubMenu
                          onClick={() => setMobileSidenav(false)}
                          href={child.href ?? ''}
                          icon={child.icon}
                          title={child.title}
                        />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </li>
          ) : (
            <li key={item.title}>
              <MobileNavLink
                onClick={() => {
                  setMobileSidenav(false);
                  setOpenMenu(null);
                  localStorage.setItem('openMenu', 'null');
                }}
                href={item.href ?? ''}
                title={item.title}
                icon={item.icon}
              />
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default MobileNavLinks;
