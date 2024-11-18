'use client';

import React from 'react';
import { useActionDialog, useDeleteDialog } from '@/hooks';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';

interface TableLayoutProps {
  children: React.ReactNode;
  searchPlaceholder: string;
  addButtonLabel: string;
  CreateDialog: React.ComponentType;
  EditDialog: React.ComponentType;
  DeleteDialog: React.ComponentType;
}

const TableLayout = <T,>({
  children,
  searchPlaceholder,
  addButtonLabel,
  CreateDialog,
  EditDialog,
  DeleteDialog,
}: TableLayoutProps) => {
  const { actionDialog } = useActionDialog<T>();
  const { deleteDialog } = useDeleteDialog();

  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder={searchPlaceholder} />
        <AddButton>{addButtonLabel}</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateDialog />}
      {actionDialog?.edit && <EditDialog />}
      {deleteDialog?.open && <DeleteDialog />}
    </>
  );
};

export default TableLayout;
