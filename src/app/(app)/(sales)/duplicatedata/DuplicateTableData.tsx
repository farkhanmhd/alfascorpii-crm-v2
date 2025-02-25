'use client';

import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { ColumnDef } from '@tanstack/react-table';
import { SelectOptions } from '@/types';
import { DataTable } from './table';

const duplicateRowSelection = atom<Record<string, boolean>>({});
const fuUsersAtom = atom<SelectOptions[]>([]);

export const useDuplicateSelection = () => {
  const [duplicateSelection, setDuplicateSelection] = useAtom(
    duplicateRowSelection
  );

  return { duplicateSelection, setDuplicateSelection };
};

export const useFuUsers = () => {
  const [fuUsers, setFuUsers] = useAtom(fuUsersAtom);

  return { fuUsers, setFuUsers };
};

const totalPageAtom = atom<{ totalData: number; total: number }>({
  totalData: 0,
  total: 0,
});

export const useDuplicateTotal = () => {
  const [totalData, settotalData] = useAtom(totalPageAtom);

  return { totalData, settotalData };
};

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  totalPages: number;
  currentPage: number;
  users: SelectOptions[];
}

const DuplicateTableData = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  rows,
  totalPages,
  currentPage,
  users,
}: DataTableProps<TData, TValue>) => {
  const { duplicateSelection, setDuplicateSelection } = useDuplicateSelection();
  const { setFuUsers } = useFuUsers();
  const { settotalData } = useDuplicateTotal();

  useEffect(() => {
    setFuUsers(users);
  }, [users]);

  useEffect(() => {
    settotalData({ totalData: totalPages, total: rows });
  }, [totalPages]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rows={rows}
      currentPage={currentPage}
      rowSelection={duplicateSelection}
      setRowSelection={setDuplicateSelection}
    />
  );
};

export default DuplicateTableData;
