import React from 'react';
import MapItems from '@/utils/MapItems';
import { Separator } from '@/components/ui/separator';
import SidebarLink from './SidebarLink';

export interface SidebarGroupProps {
  group: string;
  links: { href: string; label: string }[];
  onLinkClick?: () => void;
}

const SidebarGroup = ({ group, links, onLinkClick }: SidebarGroupProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="px-4 text-sm text-muted-foreground">{group}</p>
      <Separator />
      <MapItems
        of={links}
        render={(link) => (
          <SidebarLink
            key={link.href}
            {...link}
            onLinkClick={onLinkClick as () => void}
          />
        )}
      />
    </div>
  );
};

export default SidebarGroup;
