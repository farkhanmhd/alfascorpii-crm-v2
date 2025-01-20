'use client';

import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { ColumnDef } from '@tanstack/react-table';
import { SelectOptions } from '@/types';
import { DataTable } from './table';

const fuRowSelectionAtom = atom<Record<string, boolean>>({});
const fuUsersAtom = atom<SelectOptions[]>([]);

export const useFuSelection = () => {
  const [fuSelection, setFuSelection] = useAtom(fuRowSelectionAtom);

  return { fuSelection, setFuSelection };
};

export const useFuUsers = () => {
  const [fuUsers, setFuUsers] = useAtom(fuUsersAtom);

  return { fuUsers, setFuUsers };
};

const totalPageAtom = atom<{ totalData: number; total: number }>({
  totalData: 0,
  total: 0,
});

export const useFuTotalPage = () => {
  const [totalData, setTotalData] = useAtom(totalPageAtom);

  return { totalData, setTotalData };
};

interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  totalPages: number;
  currentPage: number;
  users: SelectOptions[];
}

const FollowUpTableData = <TData extends { id: string | number }, TValue>({
  columns,
  data,
  rows,
  totalPages,
  currentPage,
  users,
}: DataTableProps<TData, TValue>) => {
  const { fuSelection, setFuSelection } = useFuSelection();
  const { setFuUsers } = useFuUsers();
  const { setTotalData } = useFuTotalPage();

  useEffect(() => {
    setFuUsers(users);
  }, [users]);

  useEffect(() => {
    setTotalData({ totalData: totalPages, total: rows });
  }, [totalPages]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rows={rows}
      currentPage={currentPage}
      rowSelection={fuSelection}
      setRowSelection={setFuSelection}
    />
  );
};

export default FollowUpTableData;
