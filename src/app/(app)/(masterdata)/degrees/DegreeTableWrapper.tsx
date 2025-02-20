'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableDegreeColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const DegreeTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { degrees, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_education_degrees', permissions) ||
    checkPermission('delete_education_degrees', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableDegreeColumns : columns}
      data={degrees}
      rows={total}
      withPagination
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
};

export default DegreeTableWrapper;
