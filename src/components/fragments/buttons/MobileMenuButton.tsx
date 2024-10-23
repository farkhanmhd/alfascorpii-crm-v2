'use client';

import React from 'react';
import { useMobileSidenav } from '@/hooks';
import { Menu, X } from 'lucide-react';

const MobileMenuButton = () => {
  const { mobileSidenav, setMobileSidenav } = useMobileSidenav();

  const handleClick = () => {
    setMobileSidenav(!mobileSidenav);
    localStorage.setItem('openMenu', 'null');
  };
  return (
    <button type="button" onClick={handleClick}>
      {mobileSidenav ? <X className="text-primary" /> : <Menu />}
    </button>
  );
};

export default MobileMenuButton;
