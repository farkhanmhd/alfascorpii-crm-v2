'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  href: string;
  label: string;
}

const SidebarLink = ({ href, label }: Props) => {
  const pathname = usePathname();
  const active: boolean = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "before:content[''] group relative flex justify-center px-8 uppercase before:absolute before:left-0 before:top-0 before:-ml-1 before:h-full before:w-2 before:rounded-full before:duration-200",
        {
          'before:bg-primary': active,
          'hover:before:bg-primary': !active,
        }
      )}
    >
      <div
        className={cn('flex w-full rounded-md py-3 pl-12 duration-200', {
          'bg-primary text-primary-foreground': active,
          'group-hover:text-primary': !active,
        })}
      >
        {label}
      </div>
    </Link>
  );
};

export default SidebarLink;
