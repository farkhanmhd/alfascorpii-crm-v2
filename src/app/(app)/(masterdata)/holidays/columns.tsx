'use client';

import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { IHolidays, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { useDeleteDialog, useActionDialog, useSelectedDate } from '@/hooks';

const columns: Column<IHolidays>[] = [
  {
    header: 'Hari Besar',
    key: 'holiday_name',
    GetCellContent: (item) => item.holiday_name,
  },
  {
    header: 'Tanggal',
    key: 'holiday_date',
    GetCellContent: (item) => item.holiday_date,
  },
  { header: 'Ucapan', key: 'message', GetCellContent: (item) => item.message },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (hari: IHolidays) => (
      <span
        className={clsx({
          'text-green-500': hari.status === 'SHOW',
          'text-red-500': hari.status === 'HIDE',
        })}
      >
        {hari.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (item: IHolidays) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IHolidays>();
      const { setSelectedDate } = useSelectedDate();

      const handleEdit = () => {
        setActionDialog({ edit: true, data: item });
        setSelectedDate(new Date(item.holiday_date).toString());
      };

      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={handleEdit}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: item.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
