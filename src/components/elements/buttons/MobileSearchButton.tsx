'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import { useSearchDialog, useMobileSidenav } from '@/hooks';

const MobileSearchButton = () => {
  const { searchDialog, setSearchDialog } = useSearchDialog();
  const { setMobileSidenav } = useMobileSidenav();

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

  const handleClick = () => {
    setMobileSidenav(false);
    setSearchDialog(!searchDialog);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx({
        'text-primary': searchDialog,
      })}
    >
      <Search />
    </button>
  );
};

export default MobileSearchButton;
