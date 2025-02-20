'use client';

import React from 'react';
import { SelectOptions } from '@/types';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import FollowUpTableData from './FollowUpTableData';
import { columns, assignableColumn } from './columns';

type Props = {
  data: any;
  users: SelectOptions[];
  page: string;
};

const FollowUpTableWrapper = ({ data, users, page }: Props) => {
  const { permissions } = usePermissions();
  const { customers, lastPage: totalPages, total } = data;
  const canView =
    checkPermission('sales_fu_view_detail_customer_data', permissions) ||
    checkPermission('sales_customer_view_detail_customer_data', permissions);

  const canAssign = checkPermission('sales_fu_assign_to_cro', permissions);

  return (
    <FollowUpTableData
      columns={
        canAssign ? assignableColumn : canView ? assignableColumn : columns
      }
      data={customers}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      users={users}
    />
  );
};

export default FollowUpTableWrapper;
