'use client';

import React from 'react';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import CustomerTableData from './CustomerTableData';
import { columns, viewColumn } from './columns';

type Props = {
  data: any;
  page: string;
};

const CustomerTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { customers, lastPage: totalPages, total } = data;

  const canView = checkPermission(
    'sales_customer_view_detail_customer_data',
    permissions
  );

  const tableColumns = canView ? viewColumn : columns;

  return (
    <CustomerTableData
      columns={tableColumns}
      data={customers}
      currentPage={Number(page)}
      totalPages={totalPages}
      rows={total}
    />
  );
};

export default CustomerTableWrapper;
