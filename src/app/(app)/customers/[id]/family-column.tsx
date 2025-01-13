'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import type { FamilyMemberPayload } from '@/types';

const columns: ColumnDef<FamilyMemberPayload>[] = [
  {
    id: 'nik',
    accessorKey: 'nik',
    header: () => <div className="line-clamp-1 min-w-[160px]">NIK</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.nik}</div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <div className="line-clamp-1 min-w-[160px]">Nama</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.name}</div>
    ),
  },
  {
    id: 'born_place',
    accessorKey: 'born_place',
    header: () => <div className="line-clamp-1 min-w-max">Tempat Lahir</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.born_place}</div>
    ),
  },
  {
    id: 'born_date',
    accessorKey: 'born_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Lahir</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.born_date}</div>
    ),
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: () => (
      <div className="line-clamp-1 min-w-[140px]">Jenis Kelamin</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.gender}</div>
    ),
  },
  {
    id: 'religion',
    accessorKey: 'religion',
    header: () => <div className="line-clamp-1 min-w-max">Agama</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-[120px]">{row.original.religion}</div>
    ),
  },
  {
    id: 'occupation',
    accessorKey: 'occupation',
    header: () => <div className="line-clamp-1 min-w-max">Pekerjaan</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.occupation}</div>
    ),
  },
  {
    id: 'education',
    accessorKey: 'education',
    header: () => <div className="line-clamp-1 min-w-max">Pendidikan</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.education}</div>
    ),
  },
  {
    id: 'marital_status',
    accessorKey: 'marital_status',
    header: () => <div className="line-clamp-1 min-w-[160px]">Status</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.marital_status}
      </div>
    ),
  },
  {
    id: 'relation_status',
    accessorKey: 'relation_status',
    header: () => (
      <div className="line-clamp-1 min-w-max">Hubungan Keluarga</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.relation_status}
      </div>
    ),
  },
];

export default columns;
