'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { actionDialog } = useActionDialog();
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="grid h-full grid-rows-[auto] gap-y-4">
        <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden">
          <header className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
            <Tablesearch placeholder="Cari Customer" />
            <AddButton>Import Follow UP</AddButton>
          </header>
          {children}
        </div>
      </div>
      {actionDialog?.create && <ExcelDropzoneDialog />}
    </div>
  );
};

export default Layout;
