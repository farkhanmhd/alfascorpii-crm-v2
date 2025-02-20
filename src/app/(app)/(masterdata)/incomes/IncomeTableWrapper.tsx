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

const IncomeTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { incomes, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_incomes', permissions) ||
    checkPermission('delete_incomes', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={incomes}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default IncomeTableWrapper;
