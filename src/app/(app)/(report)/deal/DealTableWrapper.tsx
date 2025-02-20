'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { columns, viewableColumn } from './columns';

type Props = {
  data: any;
  page: string;
  rows: number;
  totalPages: number;
};

const DealTableWrapper = ({ data, page, rows, totalPages }: Props) => {
  const { permissions } = usePermissions();
  const canViewDetails = checkPermission('view_detail_deal', permissions);

  return (
    <DataTable
      columns={canViewDetails ? viewableColumn : columns}
      data={data}
      rows={rows}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default DealTableWrapper;
