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

const HouseOwnershipTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { houseownerships, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_house_ownerships', permissions) ||
    checkPermission('delete_house_ownerships', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={houseownerships}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default HouseOwnershipTableWrapper;
