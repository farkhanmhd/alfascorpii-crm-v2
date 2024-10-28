'use client';

import React from 'react';
import clsx from 'clsx';
import { ICustomerJob, Column } from '@/types';
import EditPekerjaanButton from './EditPekerjaanButton';
import DeletePekerjaanButton from './DeletePekerjaanButton';

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
    getCellContent: (job: ICustomerJob) => (
      <div className="flex items-center gap-x-2">
        <EditPekerjaanButton
          id={job.id}
          pekerjaan={job.job_name}
          kode={job.job_code}
          status={job.status}
        />
        <DeletePekerjaanButton id={job.id} />
      </div>
    ),
  },
];

export default columns;
