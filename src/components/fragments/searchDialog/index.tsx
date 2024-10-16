'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useSearchDialog from '@/hooks/useSearchDialog';

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';

import { NavItems } from '../sidenav/constants';

const SearchDialog = () => {
  const router = useRouter();
  const { searchDialog, setSearchDialog } = useSearchDialog();
  const handleSelected = (href: string) => {
    setSearchDialog(false);
    router.push(href);
  };
  return (
    <CommandDialog open={searchDialog} onOpenChange={setSearchDialog}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {NavItems.map((item) =>
          item.isParent ? (
            <>
              <CommandGroup key={item.title} heading={item.title}>
                {item.childrens?.map((child) => (
                  <CommandItem
                    key={child.title}
                    onSelect={() => handleSelected(child.href ?? '')}
                  >
                    <span className="mr-2 h-4 w-4">{child.icon}</span>
                    <span>{child.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          ) : (
            <>
              <CommandGroup key={item.title} heading={item.title}>
                <CommandItem
                  key={item.title}
                  onSelect={() => handleSelected(item.href ?? '')}
                >
                  <span className="mr-2 h-4 w-4">{item.icon}</span>
                  <span>{item.title}</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </>
          )
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
