'use client';

import React, { useEffect } from 'react';
import { useSearchDialog } from '@/hooks';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { Search } from 'lucide-react';

const SearchButton = () => {
  const { searchDialog, setSearchDialog } = useSearchDialog();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchDialog(!searchDialog);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [searchDialog, setSearchDialog]);

  return (
    <SidebarMenuButton tooltip="Search" onClick={() => setSearchDialog(true)}>
      <Search />
      <span>Search</span>
    </SidebarMenuButton>
  );
};

export default SearchButton;
