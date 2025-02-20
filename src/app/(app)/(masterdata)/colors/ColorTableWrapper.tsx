'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableColorColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const ColorTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { color, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_colors', permissions) ||
    checkPermission('delete_colors', permissions);
  return (
    <DataTable
      columns={canEditOrDelete ? editableColorColumns : columns}
      data={color}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default ColorTableWrapper;
