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

const HobbiesTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { hobbies, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_hobbies', permissions) ||
    checkPermission('delete_hobbies', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={hobbies}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default HobbiesTableWrapper;
