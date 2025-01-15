'use client';

import React, { useState } from 'react';
import MapItems from '@/utils/MapItems';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SidebarLink from './SidebarLink';

export interface SidebarGroupProps {
  group: string;
  links: { href: string; label: string }[];
  onLinkClick?: () => void;
  icon?: React.ReactNode;
}

const SidebarGroup = ({
  group,
  links,
  onLinkClick,
  icon,
}: SidebarGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const groupHeight = 44 * links.length + 12 * (links.length - 1);
  return (
    <>
      <Button
        variant={open ? 'default' : 'ghost'}
        className="mx-4 h-12 justify-start gap-x-4 px-8"
        onClick={() => setOpen(!open)}
      >
        {icon && icon}
        <span>{group}</span>
      </Button>
      <div
        className={cn('flex flex-col gap-y-3 overflow-hidden')}
        style={{
          height: open ? `${groupHeight}px` : '0',
          transition: 'height 0.2s ease',
        }}
      >
        <MapItems
          of={links}
          render={(link) => (
            <SidebarLink
              key={link.href}
              {...link}
              onLinkClick={onLinkClick as () => void}
              asChild
            />
          )}
        />
      </div>
    </>
  );
};

export default SidebarGroup;
