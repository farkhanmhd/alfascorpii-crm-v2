'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  href: string;
  label: string;
  onLinkClick: () => void;
  icon?: React.ReactNode;
  asChild?: boolean;
}

const SidebarLink = ({ href, label, onLinkClick, asChild, icon }: Props) => {
  const pathname = usePathname();
  const activePath = href.split('/')[1].toLowerCase();
  const splittedPathame = pathname.split('/')[1];
  const active: boolean = splittedPathame === activePath;

  const handleClick = () => {
    onLinkClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        buttonVariants({
          variant:
            active && asChild
              ? 'ghost'
              : active && !asChild
                ? 'default'
                : 'ghost',
        }),
        'relative mx-4 flex h-12 justify-start gap-x-4',
        {
          'px-16 hover:text-primary': asChild,
          'px-8': !asChild,
          'text-primary': active && asChild,
        }
      )}
    >
      {icon && icon}
      {label}
    </Link>
  );
};

export default SidebarLink;
