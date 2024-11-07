'use client';

import React from 'react';
import clsx from 'clsx';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import { IExpense, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns: Column<IExpense>[] = [
  {
    header: 'Batas Bawah',
    key: 'expense_lower_limit',
    GetCellContent: (data: IExpense) => data.expense_lower_limit,
  },
  {
    header: 'Batas Atas',
    key: 'expense_upper_limit',
    GetCellContent: (data: IExpense) => data.expense_upper_limit,
  },
  {
    header: 'Detail',
    key: 'expense_detail',
    GetCellContent: (data: IExpense) => data.expense_detail,
  },
  {
    header: 'Kode',
    key: 'expense_code',
    GetCellContent: (data: IExpense) => data.expense_code,
  },
  {
    header: 'Status',
    key: 'status',
    GetCellContent: (data: IExpense) => (
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
    GetCellContent: (expense: IExpense) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<IExpense>();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: expense })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: expense.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
