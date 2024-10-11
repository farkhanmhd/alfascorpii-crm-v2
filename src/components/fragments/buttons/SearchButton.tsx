'use client';

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { searchDialogAtom } from '@/store';
import { Button } from '@/components/ui/button';

const SearchButton = () => {
  const [searchDialog, setSearchDialog] = useAtom(searchDialogAtom);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchDialog(!searchDialog);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [searchDialog]);

  return (
    <Button
      variant="secondary"
      className="z-50 flex items-center justify-between gap-x-32 rounded-full text-sm text-muted-foreground"
      onClick={() => setSearchDialog(!searchDialog)}
    >
      Search...{' '}
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
};

export default SearchButton;
