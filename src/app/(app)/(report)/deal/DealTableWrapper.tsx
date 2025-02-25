'use client';

import React from 'react';
import { DataTable } from './table';
import { columns } from './columns';

type Props = {
  data: any;
  page: string;
  rows: number;
  totalPages: number;
};

const DealTableWrapper = ({ data, page, rows, totalPages }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      rows={rows}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default DealTableWrapper;
