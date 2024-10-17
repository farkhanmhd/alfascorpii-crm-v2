'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IStaff } from '@/types';
import { Column } from '@/components/fragments/table/DataTable';

const columns: Column<IStaff>[] = [
  { header: 'NIP', key: 'nip' as keyof IStaff },
  { header: 'Username', key: 'username' as keyof IStaff },
  { header: 'Name', key: 'name' as keyof IStaff },
  { header: 'Email', key: 'email' as keyof IStaff },
  {
    header: 'Status',
    key: 'status' as keyof IStaff,
    getCellContent: (staff: IStaff) => (
      <span
        className={clsx({
          'text-green-500': staff.status === 'VALID',
          'text-yellow-500': staff.status === 'SUSPEND',
          'text-red-500': staff.status === 'RESIGN',
        })}
      >
        {staff.status}
      </span>
    ),
  },
  { header: 'Role', key: 'role' as keyof IStaff },
  {
    header: 'Action',
    key: 'action' as keyof IStaff,
    getCellContent: (staff: IStaff) => (
      <Link
        className="text-primary hover:underline"
        href={`/staff/${staff.id}`}
      >
        Edit
      </Link>
    ),
  },
];

export default columns;
