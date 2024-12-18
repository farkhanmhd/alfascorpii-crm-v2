'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex flex-wrap gap-2 lg:flex-col lg:gap-x-0 lg:gap-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-secondary',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
