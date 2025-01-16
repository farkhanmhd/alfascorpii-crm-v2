'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
  const groupHeight = 48 * links.length + 12 * (links.length - 1);
  return (
    <div>
      <div className="px-4">
        <Button
          variant="ghost"
          className={cn(
            'h-12 w-full justify-between gap-x-4 pl-8 hover:text-primary',
            {
              'text-primary': open,
            }
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-x-4">
            {icon && icon}
            <span>{group}</span>
          </div>
          <ChevronDown
            className={cn('h-4 w-4 duration-200', { 'rotate-180': open })}
          />
        </Button>
        <div
          className={cn('flex flex-col gap-y-3 overflow-hidden', {
            'pt-2': open,
          })}
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
      </div>
    </div>
  );
};

export default SidebarGroup;
