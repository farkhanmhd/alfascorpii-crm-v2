'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableHolidayColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const HolidayTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { holidays, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_holidays', permissions) ||
    checkPermission('delete_holidays', permissions);

  console.log(canEditOrDelete);

  return (
    <DataTable
      columns={canEditOrDelete ? editableHolidayColumns : columns}
      data={holidays}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default HolidayTableWrapper;
