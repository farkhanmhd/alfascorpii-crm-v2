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

const FuResultTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { furesult, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_follow_up_results', permissions) ||
    checkPermission('delete_follow_up_results', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={furesult}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default FuResultTableWrapper;
