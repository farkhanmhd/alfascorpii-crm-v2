'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import {
  CreateHolidayDialog,
  EditHolidayDialog,
  DeleteHolidayDialog,
} from './actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { deleteDialog } = useDeleteDialog();
  const { actionDialog } = useActionDialog();

  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Holiday" />
        <AddButton>Add Hari Besar</AddButton>
      </TableContainerHeader>
      {children}
      {actionDialog?.create && <CreateHolidayDialog />}
      {actionDialog?.edit && <EditHolidayDialog />}
      {deleteDialog?.open && <DeleteHolidayDialog />}
    </>
  );
};

export default Layout;
