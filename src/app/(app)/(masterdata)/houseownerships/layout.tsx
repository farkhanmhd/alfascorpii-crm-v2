'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateHouseOwnershipDialog,
  EditHouseOwnershipDialog,
  RemoveHouseOwnershipDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Status Rumah" />
        <AddButton>Add Status Rumah</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateHouseOwnershipDialog />}
      {actionDialog?.edit && <EditHouseOwnershipDialog />}
      {deleteDialog?.open && <RemoveHouseOwnershipDialog />}
    </>
  );
};

export default Layout;
