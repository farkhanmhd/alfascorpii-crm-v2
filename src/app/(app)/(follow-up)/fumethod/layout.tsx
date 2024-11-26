'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateFuMethodDialog,
  EditFuMethodDialog,
  DeleteFuMethodDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Method" />
        <AddButton>Add Method</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateFuMethodDialog />}
      {actionDialog?.edit && <EditFuMethodDialog />}
      {deleteDialog?.open && <DeleteFuMethodDialog />}
    </>
  );
};

export default Layout;
