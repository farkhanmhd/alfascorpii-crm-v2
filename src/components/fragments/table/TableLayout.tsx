'use client';

import React from 'react';
import { useActionDialog, useDeleteDialog } from '@/hooks';
import Tablesearch from './tablesearch';
import AddButton from '../buttons/AddButton';

interface TableLayoutProps {
  children: React.ReactNode;
  CreateDialog: React.ComponentType;
  EditDialog: React.ComponentType;
  DeleteDialog: React.ComponentType;
  addButtonLabel: string;
  searchPlaceholder: string;
}

const TableLayout = <T,>({
  children,
  CreateDialog,
  EditDialog,
  DeleteDialog,
  addButtonLabel,
  searchPlaceholder,
}: TableLayoutProps) => {
  const { actionDialog } = useActionDialog<T>();
  const { deleteDialog } = useDeleteDialog();

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-auto">
      <header className="flex items-center justify-between gap-x-4 py-4">
        <Tablesearch placeholder={searchPlaceholder} />
        <AddButton>{addButtonLabel}</AddButton>
      </header>
      {children}
      {actionDialog?.create && <CreateDialog />}
      {actionDialog?.edit && <EditDialog />}
      {deleteDialog?.open && <DeleteDialog />}
    </div>
  );
};

export default TableLayout;
