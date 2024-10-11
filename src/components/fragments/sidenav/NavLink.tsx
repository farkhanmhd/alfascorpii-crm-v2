'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { NavItem } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scrollarea';
import NavLinkSubMenu from './NavLinkSubMenu';

const NavLink = ({ href, title, icon, isParent, childrens }: NavItem) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mainPath = pathname.split('/').filter((path) => path !== '')[0];
  const activeLink =
    pathname === '/'
      ? href === '/'
      : mainPath.split('-').join(' ') === title.toLowerCase();

  return isParent ? (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="master-data" className="border-none">
        <AccordionTrigger
          className={clsx(
            'flex min-w-[260px] items-center gap-x-4 rounded-xl px-8 py-3 text-black duration-300 hover:no-underline dark:text-white',
            {
              'bg-primary text-white': isOpen,
            }
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{icon}</span>
          <span>{title}</span>
        </AccordionTrigger>
        <ScrollArea
          className={clsx('ide-scroll-bar duration-300', {
            'h-0': !isOpen,
            'mt-4 h-[30vh]': isOpen,
          })}
        >
          <AccordionContent className="ml-[42px] flex flex-col gap-x-8 gap-y-1 border-l-2 text-base duration-300">
            {childrens?.map((child) => (
              <NavLinkSubMenu
                key={child.title}
                href={child.href ?? ''}
                title={child.title}
                icon={child.icon}
              />
            ))}
          </AccordionContent>
        </ScrollArea>
      </AccordionItem>
    </Accordion>
  ) : (
    <Link
      href={href ?? '/'}
      className={clsx(
        'flex min-w-[260px] items-center gap-x-8 rounded-xl px-8 py-3 duration-300',
        {
          'bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/60':
            activeLink,
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

export default NavLink;
