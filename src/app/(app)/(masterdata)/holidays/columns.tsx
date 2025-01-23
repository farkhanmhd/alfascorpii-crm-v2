'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IHolidays } from '@/types';
import { DeleteHolidayDialog, EditHolidayDialog } from './actions';

const columns: ColumnDef<IHolidays>[] = [
  {
    header: 'Hari Besar',
    accessorKey: 'holiday_name',
  },
  {
    header: 'Tanggal',
    accessorKey: 'holiday_date',
  },
  { header: 'Ucapan', accessorKey: 'message' },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({ row }) => (
      <div
        className={clsx({
          'font-semibold text-green-500': row.getValue('status') === 'SHOW',
          'font-semibold text-red-500': row.getValue('status') === 'HIDE',
        })}
      >
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <EditHolidayDialog
            id={Number(row.original.id)}
            holiday={row.original.holiday_name}
            date={row.original.holiday_date}
            message={row.original.message}
            status={row.original.status}
          />
          <DeleteHolidayDialog id={Number(row.original.id)} />
        </div>
      );
    },
  },
];

export default columns;
