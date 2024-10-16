'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import useMobileSidenav from '@/hooks/useMobileSidenav';
import useSearchDialog from '@/hooks/useSearchDialog';
import { Search } from 'lucide-react';

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
  }, [searchDialog]);

  const handleClick = () => {
    setMobileSidenav(false);
    setSearchDialog(!searchDialog);
  };

  return (
    <button
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
