'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateCustomerJobDialog,
  EditCustomerJobDialog,
  DeleteJobDialog,
} from './actions';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Pekerjaan" />
        <AddButton>Add Pekerjaan</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateCustomerJobDialog />}
      {actionDialog?.edit && <EditCustomerJobDialog />}
      {deleteDialog?.open && <DeleteJobDialog />}
    </>
  );
};

export default Layout;
