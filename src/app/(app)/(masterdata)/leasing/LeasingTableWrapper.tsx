'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableLeasingColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const LeasingTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { leasings, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_leasing', permissions) ||
    checkPermission('delete_leasing', permissions);
  return (
    <DataTable
      columns={canEditOrDelete ? editableLeasingColumns : columns}
      data={leasings}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default LeasingTableWrapper;
