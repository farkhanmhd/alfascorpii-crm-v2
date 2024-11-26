'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateIncomeDialog,
  EditIncomeDialog,
  DeleteIncomeDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Penghasilan" />
        <AddButton>Add Penghasilan</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateIncomeDialog />}
      {actionDialog?.edit && <EditIncomeDialog />}
      {deleteDialog?.open && <DeleteIncomeDialog />}
    </>
  );
};

export default Layout;
