'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import { Button } from '@/components/ui/button';
import useCreateDialog from '@/hooks/useCreateDialog';
import AddPekerjaanDialog from './AddPekerjaanDialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setCreateDialog } = useCreateDialog();
  return (
    <div className="flex h-full flex-1 flex-col">
      <TableContainerHeader>
        <Tablesearch placeholder="Search pekerjaan" />
        <Button
          className="w-fit text-white"
          onClick={() => setCreateDialog(true)}
        >
          Add Pekerjaan
        </Button>
      </TableContainerHeader>
      {children}
      <AddPekerjaanDialog />
    </div>
  );
};

export default Layout;
