'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateHobbyDialog,
  EditHobbyDialog,
  DeleteHobbyDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Hobi" />
        <AddButton>Add Hobi</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateHobbyDialog />}
      {actionDialog?.edit && <EditHobbyDialog />}
      {deleteDialog?.open && <DeleteHobbyDialog />}
    </>
  );
};

export default Layout;
