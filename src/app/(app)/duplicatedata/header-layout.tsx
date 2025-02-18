'use client';

import React from 'react';
import Tablesearch from '@/components/elements/table/tablesearch';

interface Props {
  children: React.ReactNode;
}

const HeaderLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <header className="flex items-center justify-between gap-x-4 py-4">
        <Tablesearch placeholder="Cari Customer" />
      </header>
      {children}
    </div>
  );
};

export default HeaderLayout;
