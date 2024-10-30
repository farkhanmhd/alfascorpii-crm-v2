'use client';

import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ICustomerJob, Column } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns: Column<ICustomerJob>[] = [
  {
    header: 'Kode',
    key: 'job_code',
    getCellContent: (job: ICustomerJob) => job.job_code,
  },
  {
    header: 'Pekerjaan',
    key: 'job_name',
    getCellContent: (job: ICustomerJob) => job.job_name,
  },

  {
    header: 'Status',
    key: 'status',
    getCellContent: (job: ICustomerJob) => (
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
    getCellContent: (job: ICustomerJob) => {
      const { push } = useRouter();
      return (
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => push(`/customers/customerjobs/${job.id}`)}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              push(`/customers/customerjobs/${job.id}?remove=true`)
            }
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
