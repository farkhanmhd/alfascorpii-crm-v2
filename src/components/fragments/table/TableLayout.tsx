'use client';

import React from 'react';
import { useActionDialog, useDeleteDialog } from '@/hooks';

interface TableLayoutProps {
  children: React.ReactNode;
  CreateDialog: React.ComponentType;
  EditDialog: React.ComponentType;
  DeleteDialog: React.ComponentType;
}

const TableLayout = <T,>({
  children,
  CreateDialog,
  EditDialog,
  DeleteDialog,
}: TableLayoutProps) => {
  const { actionDialog } = useActionDialog<T>();
  const { deleteDialog } = useDeleteDialog();

  return (
    <>
      {children}
      {actionDialog?.create && <CreateDialog />}
      {actionDialog?.edit && <EditDialog />}
      {deleteDialog?.open && <DeleteDialog />}
    </>
  );
};

export default TableLayout;
