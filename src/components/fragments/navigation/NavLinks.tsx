'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scrollarea';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { NavItem, NavLinksProps } from '@/types';
import { useMobileSidenav, useSidebarDesktop } from '@/hooks';
import NavLinkSubMenu from './NavLinkSubMenu';
import SideNavLink from '../sidenav/SideNavLink';
import MobileNavLink from '../mobilenav/MobileNavLink';

const NavLinks = ({ items, isOpen, isMobile = false }: NavLinksProps) => {
  const { sidebarOpen, setSidebarOpen } = useSidebarDesktop();
  const { setMobileSidenav } = useMobileSidenav();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu((prevTitle) => (prevTitle === title ? null : title));
    localStorage.setItem('openMenu', title);
  };

  const handleAccordionClick = (title: string) => {
    toggleMenu(title);
    setActiveButton(title);
    setSidebarOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setOpenMenu(null);
      localStorage.setItem('openMenu', 'null');
    }
  }, [isOpen]);

  const handleNavLinkClick = (itemTitle: string) => {
    setMobileSidenav(false);
    setActiveButton(itemTitle);
    localStorage.setItem('activeButton', itemTitle);
  };

  return (
    <nav className="px-3">
      <ul className="flex flex-col gap-y-4">
        {items.map((item: NavItem) =>
          item.isParent ? (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => handleAccordionClick(item.title)}
                className={clsx(
                  'flex w-full items-center rounded-xl py-3 duration-300',
                  {
                    'bg-primary text-white hover:bg-primary/80':
                      activeButton === item.title,
                    'text-black hover:text-primary dark:text-white dark:hover:text-primary':
                      activeButton !== item.title,
                    'justify-between px-8': isOpen,
                    'justify-center': !isOpen,
                  }
                )}
              >
                <div className="flex items-center gap-x-4">
                  <span>{item.icon}</span>
                  {isOpen && <span className="w-max">{item.title}</span>}
                </div>
                {isOpen && (
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
              {isOpen && (
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
                          href={child.href ?? ''}
                          icon={child.icon}
                          title={child.title}
                          onClick={() => handleNavLinkClick(item.title)}
                        />
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </li>
          ) : (
            <li key={item.title}>
              {isMobile ? (
                <MobileNavLink
                  onClick={() => handleNavLinkClick(item.title)}
                  href={item.href ?? ''}
                  title={item.title}
                  icon={item.icon}
                  showText
                />
              ) : (
                <SideNavLink
                  href={item.href ?? ''}
                  title={item.title}
                  icon={item.icon}
                  showText={sidebarOpen}
                />
              )}
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default NavLinks;
