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

const MotorcyclesTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { motorcycles, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_motorcycle', permissions) ||
    checkPermission('delete_motorcycle', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={motorcycles}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default MotorcyclesTableWrapper;
