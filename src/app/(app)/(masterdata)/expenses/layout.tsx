'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateExpenseDialog,
  EditExpenseDialog,
  DeleteExpenseDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Pengeluaran" />
        <AddButton>Add Pengeluaran</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateExpenseDialog />}
      {actionDialog?.edit && <EditExpenseDialog />}
      {deleteDialog?.open && <DeleteExpenseDialog />}
    </>
  );
};

export default Layout;
