'use client';

import React from 'react';
import clsx from 'clsx';
import { useDeleteDialog, useActionDialog } from '@/hooks';
import { ICustomerJob, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns: Column<ICustomerJob>[] = [
  {
    header: 'Kode',
    key: 'job_code',
    GetCellContent: (job: ICustomerJob) => job.job_code,
  },
  {
    header: 'Pekerjaan',
    key: 'job_name',
    GetCellContent: (job: ICustomerJob) => job.job_name,
  },

  {
    header: 'Status',
    key: 'status',
    GetCellContent: (job: ICustomerJob) => (
      <span
        className={clsx({
          'text-green-500': job.status === 'SHOW',
          'text-red-500': job.status === 'HIDE',
        })}
      >
        {job.status}
      </span>
    ),
  },
  {
    header: 'Action',
    GetCellContent: (job: ICustomerJob) => {
      const { setDeleteDialog } = useDeleteDialog();
      const { setActionDialog } = useActionDialog<ICustomerJob>();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setActionDialog({ edit: true, data: job })}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setDeleteDialog({ open: true, id: job.id })}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
