'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import { Button } from '@/components/ui/button';
import { useCreateDialog } from '@/hooks';
import AddPekerjaanDialog from './AddPekerjaanDialog';
import EditPekerjaanDialog from './EditPekerjaanDialog';
import DeletePekerjaanDialog from './DeletePekerjaanDialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setCreateDialog } = useCreateDialog();

  const openPekerjaanDialog = () => {
    setCreateDialog((prevState) => ({
      ...prevState,
      pekerjaan: {
        ...prevState.pekerjaan,
        open: true,
      },
    }));
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <TableContainerHeader>
        <Tablesearch placeholder="Search pekerjaan" />
        <Button className="w-fit text-white" onClick={openPekerjaanDialog}>
          Add Pekerjaan
        </Button>
      </TableContainerHeader>
      {children}
      <AddPekerjaanDialog />
      <EditPekerjaanDialog />
      <DeletePekerjaanDialog />
    </div>
  );
};

export default Layout;
