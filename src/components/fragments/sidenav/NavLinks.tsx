'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useSidebarDesktop from '@/hooks/useSidebarDesktop';
import useMobileSidenav from '@/hooks/useMobileSidenav';
import { ScrollArea } from '@/components/ui/scrollarea';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import NavLink from './NavLink';
import NavLinkSubMenu from './NavLinkSubMenu';
import { NavItem } from '@/types';

const NavLinks = ({ items }: { items: NavItem[] }) => {
  const { setMobileSidenav } = useMobileSidenav();
  const [openMenu, setOpenMenu] = useState<string | null>(
    localStorage.getItem('openMenu')
  );
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useSidebarDesktop();

  const toggleMenu = (title: string) => {
    setOpenMenu((prevTitle) => (prevTitle === title ? null : title));
    localStorage.setItem('openMenu', title);
  };

  const handleSubmenu = (title: string) => {
    setSidebarOpen(true);
    toggleMenu(title);

    if (title === 'Customers' && pathname !== '/customers') {
      router.push('/customers');
    }
  };

  useEffect(() => {
    if (!sidebarOpen) {
      setOpenMenu(null);
      localStorage.setItem('openMenu', 'null');
    }
  }, [sidebarOpen]);

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
                    'justify-between px-8': sidebarOpen,
                    'justify-center': !sidebarOpen,
                  }
                )}
              >
                <div className="flex items-center gap-x-4">
                  <span>{item.icon}</span>
                  {sidebarOpen && <span className="w-max">{item.title}</span>}
                </div>
                {sidebarOpen && (
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
              {sidebarOpen && (
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
              <NavLink
                onClick={() => {
                  setOpenMenu(null);
                  setMobileSidenav(false);
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

export default NavLinks;
