'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateRelationDialog,
  EditRelationDialog,
  DeleteRelationDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Kerabat" />
        <AddButton>Add Kerabat</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateRelationDialog />}
      {actionDialog?.edit && <EditRelationDialog />}
      {deleteDialog?.open && <DeleteRelationDialog />}
    </>
  );
};

export default Layout;
