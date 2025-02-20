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

const FuDetailTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { detailfu, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_follow_up_details', permissions) ||
    checkPermission('delete_follow_up_details', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={detailfu}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default FuDetailTableWrapper;
