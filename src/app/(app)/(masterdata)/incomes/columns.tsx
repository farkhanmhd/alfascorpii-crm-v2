'use client';

import React from 'react';
import clsx from 'clsx';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import { IIncome, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns: Column<IIncome>[] = [
  {
    header: 'Batas Bawah',
    key: 'income_lower_limit',
    GetCellContent: (data: IIncome) => data.income_lower_limit,
  },
  {
    header: 'Batas Atas',
    key: 'income_upper_limit',
    GetCellContent: (data: IIncome) => data.income_upper_limit,
  },
  {
    header: 'Detail',
    key: 'income_detail',
    GetCellContent: (data: IIncome) => data.income_detail,
  },
  {
    header: 'Kode',
    key: 'income_code',
    GetCellContent: (data: IIncome) => data.income_code,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (data: IIncome) => (
      <span
        className={clsx({
          'text-green-500': data.status === 'SHOW',
          'text-red-500': data.status === 'HIDE',
        })}
      >
        {data.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (income: IIncome) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IIncome>();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: income })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: income.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
