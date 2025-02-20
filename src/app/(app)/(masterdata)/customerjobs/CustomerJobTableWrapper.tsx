'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableCustomerJobColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const CustomerJobTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { jobs, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_jobs', permissions) ||
    checkPermission('delete_jobs', permissions);

  console.log(canEditOrDelete);
  return (
    <DataTable
      columns={canEditOrDelete ? editableCustomerJobColumns : columns}
      data={jobs}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default CustomerJobTableWrapper;
