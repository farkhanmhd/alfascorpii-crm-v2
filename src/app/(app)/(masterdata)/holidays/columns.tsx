'use client';

import React from 'react';
import clsx from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { IHolidays } from '@/types';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { DeleteHolidayDialog, EditHolidayDialog } from './actions';

export const editableHolidayColumns: ColumnDef<IHolidays>[] = [
  {
    accessorKey: 'holiday_name',
    header: 'Holiday',
  },
  {
    accessorKey: 'holiday_date',
    header: 'Tanggal',
  },
  {
    accessorKey: 'message',
    header: 'Ucapan',
  },
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
    header: () => {
      return <div className="text-right">Aksi</div>;
    },
    cell: ({ row }) => {
      const { permissions } = usePermissions();
      const canEditHoliday =
        checkPermission('edit_holidays', permissions) &&
        checkPermission('view_holidays', permissions);
      const canDeleteHoliday =
        checkPermission('delete_holidays', permissions) &&
        checkPermission('view_holidays', permissions);

      return (
        <div className="flex justify-end gap-x-4">
          {canEditHoliday && (
            <EditHolidayDialog
              id={Number(row.original.id)}
              holiday={row.original.holiday_name}
              date={row.original.holiday_date}
              message={row.original.message}
              status={row.original.status}
            />
          )}
          {canDeleteHoliday && (
            <DeleteHolidayDialog id={Number(row.original.id)} />
          )}
        </div>
      );
    },
  },
];

export const columns: ColumnDef<IHolidays>[] = [
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
];

export default columns;
