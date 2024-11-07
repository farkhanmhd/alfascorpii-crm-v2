'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateDegreeDialog,
  EditDegreeDialog,
  DeleteDegreeDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <TableContainerHeader>
          <Tablesearch placeholder="Search Pendidikan" />
          <AddButton>Add Pendidikan</AddButton>
        </TableContainerHeader>
        {children}
      </div>
      {actionDialog?.create && <CreateDegreeDialog />}
      {actionDialog?.edit && <EditDegreeDialog />}
      {deleteDialog?.open && <DeleteDegreeDialog />}
    </>
  );
};

export default Layout;
