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

const ExpenseTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { expenses, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_expenses', permissions) ||
    checkPermission('delete_expenses', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={expenses}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default ExpenseTableWrapper;
