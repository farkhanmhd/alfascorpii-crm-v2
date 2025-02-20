'use client';

import React from 'react';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';
import { SelectOptions } from '@/types';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { RandomAssignDialog, SendCroDialog } from './dialogs';

type Props = {
  rowSelection: Record<string, boolean>;
  users: SelectOptions[];
};

const FollowUpDialogs = ({ rowSelection, users }: Props) => {
  const { permissions } = usePermissions();
  const canImportFu =
    checkPermission('view_sales', permissions) &&
    checkPermission('view_sales_follow_up', permissions) &&
    checkPermission('sales_fu_import_data', permissions);

  const canAssign =
    checkPermission('view_sales', permissions) &&
    checkPermission('view_sales_follow_up', permissions) &&
    checkPermission('sales_fu_assign_to_cro', permissions);

  return (
    <footer className="flex flex-col gap-4 pt-6 sm:flex-row">
      {canImportFu && <ExcelDropzoneDialog />}
      {canAssign &&
        (Object.keys(rowSelection).length === 0 ? (
          <RandomAssignDialog users={users} />
        ) : (
          <SendCroDialog selectedRows={rowSelection} users={users} />
        ))}
    </footer>
  );
};

export default FollowUpDialogs;
