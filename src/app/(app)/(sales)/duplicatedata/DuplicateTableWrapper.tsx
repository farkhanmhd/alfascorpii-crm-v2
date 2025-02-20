'use client';

import React from 'react';
import { SelectOptions } from '@/types';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import DuplicateTableData from './DuplicateTableData';
import { columns, viewableColumn, assignableColumn } from './columns';

type Props = {
  data: any;
  users: SelectOptions[];
  page: string;
};

const DuplicateTableWrapper = ({ data, users, page }: Props) => {
  const { permissions } = usePermissions();

  const { duplicatedatas, lastPage: totalPages, total } = data;

  const canView =
    checkPermission('sales_fu_view_detail_customer_data', permissions) ||
    checkPermission('sales_customer_view_detail_customer_data', permissions);

  const canAssign = checkPermission(
    'sales_duplicate_data_assign_to_cro',
    permissions
  );

  console.log(duplicatedatas);

  return (
    <DuplicateTableData
      columns={
        canAssign ? assignableColumn : canView ? viewableColumn : columns
      }
      data={duplicatedatas}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      users={users}
    />
  );
};

export default DuplicateTableWrapper;
