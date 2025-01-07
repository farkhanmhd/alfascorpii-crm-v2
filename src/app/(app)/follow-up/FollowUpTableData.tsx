'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/fragments/table/DataTable';
import FollowUpFooter from './FollowUpFooter';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  totalPages: number;
  currentPage: number;
  withPagination?: boolean;
}

const FollowUpTableData = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  rows,
  totalPages,
  currentPage,
  withPagination = false,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  return (
    <DataTable
      columns={columns}
      data={data}
      rows={rows}
      totalPages={totalPages}
      currentPage={currentPage}
      withPagination={withPagination}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    >
      <FollowUpFooter rowSelection={rowSelection} />
    </DataTable>
  );
};

export default FollowUpTableData;
