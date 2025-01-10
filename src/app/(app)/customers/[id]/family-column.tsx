'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import type { IFamilyMember } from '@/types';

export interface FamilyMember {
  id: string;
  nik: string;
  name: string;
  gender: string;
  birthplace: string;
  date_of_birth: string;
  religion: string;
  job: string;
  education: string;
  marital_status: string;
  relationship: string;
}

const columns: ColumnDef<IFamilyMember>[] = [
  {
    id: 'nik',
    accessorKey: 'nik',
    header: () => <div className="line-clamp-1 min-w-max">NIK</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.nik}</div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <div className="line-clamp-1 min-w-max">Nama</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.name}</div>
    ),
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: () => <div className="line-clamp-1 min-w-max">Jenis Kelamin</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.gender}</div>
    ),
  },
  {
    id: 'birthplace',
    accessorKey: 'birthplace',
    header: () => <div className="line-clamp-1 min-w-max">Tempat Lahir</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.born_place}</div>
    ),
  },
  {
    id: 'date_of_birth',
    accessorKey: 'date_of_birth',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Lahir</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.born_date}</div>
    ),
  },
  {
    id: 'religion',
    accessorKey: 'religion',
    header: () => <div className="line-clamp-1 min-w-max">Agama</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.religion}</div>
    ),
  },
  {
    id: 'job',
    accessorKey: 'job',
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
    header: () => <div className="line-clamp-1 min-w-max">Status</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.marital_status}
      </div>
    ),
  },
  {
    id: 'relationship',
    accessorKey: 'relationship',
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
