'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateProductDialog,
  EditProductDialog,
  DeleteProductDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <TableContainerHeader>
          <Tablesearch placeholder="Search Product" />
          <AddButton>Add Product</AddButton>
        </TableContainerHeader>
        {children}
      </div>
      {actionDialog?.create && <CreateProductDialog />}
      {actionDialog?.edit && <EditProductDialog />}
      {deleteDialog?.open && <DeleteProductDialog />}
    </>
  );
};

export default Layout;
