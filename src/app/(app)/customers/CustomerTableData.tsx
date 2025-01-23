'use client';

import React, { useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { atom, useAtom } from 'jotai';
import { DataTable } from './table';

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  totalPages: number;
  currentPage: number;
}

const customerPageAtom = atom<{ totalData: number; totalPages: number }>({
  totalData: 0,
  totalPages: 0,
});

export const useCustomerPage = () => {
  const [customerTotal, setCustomerTotal] = useAtom(customerPageAtom);

  return { customerTotal, setCustomerTotal };
};

const CustomerTableData = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  rows,
  totalPages,
  currentPage,
}: DataTableProps<TData, TValue>) => {
  const { setCustomerTotal } = useCustomerPage();

  useEffect(() => {
    if (totalPages) {
      setCustomerTotal({
        totalData: rows,
        totalPages,
      });
    }
  }, [totalPages]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rows={rows}
      currentPage={currentPage}
    />
  );
};

export default CustomerTableData;
