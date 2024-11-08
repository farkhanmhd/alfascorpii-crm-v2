'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import AddButton from '@/components/fragments/buttons/AddButton';
import {
  CreateDealerDialog,
  EditDealerDialog,
  DeleteDealerDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { actionDialog } = useActionDialog();
  const { deleteDialog } = useDeleteDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Dealer" />
        <AddButton>Add Dealer</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateDealerDialog />}
      {actionDialog?.edit && <EditDealerDialog />}
      {deleteDialog?.open && <DeleteDealerDialog />}
    </>
  );
};

export default Layout;
