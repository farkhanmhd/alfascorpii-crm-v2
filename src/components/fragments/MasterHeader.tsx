import React from 'react';
import Tablesearch from '@/components/elements/table/tablesearch';

type Props = {
  children: React.ReactNode;
  searchPlaceholder: string;
};

const MasterHeader = ({ children, searchPlaceholder }: Props) => {
  return (
    <header className="flex items-center justify-between gap-x-4 py-4">
      <Tablesearch placeholder={searchPlaceholder} />
      {children}
    </header>
  );
};

export default MasterHeader;
