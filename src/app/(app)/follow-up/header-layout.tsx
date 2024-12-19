'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import Tablesearch from '@/components/fragments/table/tablesearch';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

const HeaderLayout = ({ children }: Props) => {
  const { setActionDialog } = useActionDialog();

  const handleActionDialog = () => {
    setActionDialog({ create: true });
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto]">
      <header className="flex items-center justify-between gap-x-4 py-4">
        <Tablesearch placeholder="Cari Customer" />
        <Button onClick={handleActionDialog}>Import Follow Up</Button>
      </header>
      {children}
    </div>
  );
};

export default HeaderLayout;
