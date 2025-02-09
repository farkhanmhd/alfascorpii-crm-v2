import React from 'react';
import Tablesearch from '@/components/elements/table/tablesearch';

interface Props {
  children: React.ReactNode;
}

const HeaderLayout = ({ children }: Props) => {
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto]">
      <header className="flex items-center justify-between gap-x-4 pb-6">
        <Tablesearch placeholder="Cari Customer" />
      </header>
      {children}
    </div>
  );
};

export default HeaderLayout;
