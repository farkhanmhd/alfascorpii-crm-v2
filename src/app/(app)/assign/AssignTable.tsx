'use client';

import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { ICustomer } from '@/types';
import { columns } from './columns';
import { useSelectedRows } from '@/hooks';

interface Props {
  data: ICustomer[];
  totalPages: number;
  currentPage: number;
  rows: number;
}

const AssignTable = ({ data, totalPages, currentPage, rows }: Props) => {
  const { selectedRows, setSelectedRows } = useSelectedRows('assignTable');

  return (
    <DataTable
      columns={columns}
      data={data}
      totalPages={totalPages}
      currentPage={currentPage}
      rows={rows}
      rowSelection={selectedRows}
      setRowSelection={() => setSelectedRows(selectedRows)}
    />
  );
};

export default AssignTable;
