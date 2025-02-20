'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const StatusFuTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { statusfu, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_status_follow_up', permissions) ||
    checkPermission('delete_status_follow_up', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={statusfu}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default StatusFuTableWrapper;
