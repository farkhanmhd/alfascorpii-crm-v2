'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableDealerColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const DealerTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { dealers, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_dealers', permissions) ||
    checkPermission('delete_dealers', permissions);
  return (
    <DataTable
      columns={canEditOrDelete ? editableDealerColumns : columns}
      data={dealers}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default DealerTableWrapper;
