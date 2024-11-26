'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateLeasingDialog,
  EditLeasingDialog,
  DeleteLeasingDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Leasing" />
        <AddButton>Add Leasing</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateLeasingDialog />}
      {actionDialog?.edit && <EditLeasingDialog />}
      {deleteDialog?.open && <DeleteLeasingDialog />}
    </>
  );
};

export default Layout;
