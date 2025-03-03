'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/elements/table/DataTable';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  totalPages: number;
  currentPage: number;
  withPagination?: boolean;
}

const DealTableData = <TData extends { id: string | number }, TValue>({
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
    />
  );
};

export default DealTableData;
