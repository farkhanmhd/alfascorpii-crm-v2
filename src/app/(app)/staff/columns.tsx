'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IStaff, Column } from '@/types';

const columns: Column<IStaff>[] = [
  { header: 'NIP', key: 'nip', getCellContent: (staff: IStaff) => staff.nip },
  {
    header: 'Username',
    key: 'username',
    getCellContent: (staff: IStaff) => staff.username,
  },
  {
    header: 'Name',
    key: 'name',
    getCellContent: (staff: IStaff) => staff.name,
  },
  {
    header: 'Email',
    key: 'email',
    getCellContent: (staff: IStaff) => staff.email,
  },
  {
    header: 'Status',
    key: 'status',
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
  {
    header: 'Role',
    key: 'role',
    getCellContent: (staff: IStaff) => staff.role,
  },
  {
    header: 'Action',
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
