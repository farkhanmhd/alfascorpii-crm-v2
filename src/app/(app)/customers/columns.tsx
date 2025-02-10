'use client';

import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
// import { Checkbox } from '@/components/ui/checkbox';
import { buttonVariants } from '@/components/ui/button';
import { ICustomer } from '@/types';
import { Pencil } from 'lucide-react';

export const columns: ColumnDef<ICustomer>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="border-blue-500 bg-background data-[state=checked]:bg-blue-500"
  //     />
  //   ),

  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="border-blue-500 bg-background data-[state=checked]:bg-blue-500"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: 'no',
    header: 'No',
    cell: ({ row, table }) => {
      const startIndex =
        table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize;
      return <div>{startIndex + row.index + 1}</div>;
    },
  },

  // {
  //   accessorKey: 'dealer_code',
  //   header: 'Dealer Code',
  // },

  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex justify-end gap-x-4">
          <Link
            href={`/customers/${customer.id}`}
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: 'outline',
              })
            )}
          >
            <Pencil />
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: 'nik',
    header: 'nik',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.nik}</div>
    ),
  },
  {
    accessorKey: 'customer_name',
    header: 'Nama',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.customer_name}</div>
    ),
  },
  {
    accessorKey: 'customer_address',
    header: 'Alamat',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.customer_address}
      </div>
    ),
  },
  {
    accessorKey: 'sub_district',
    header: 'Kelurahan',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.sub_district}</div>
    ),
  },
  {
    accessorKey: 'district',
    header: 'Kecamatan',
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.district}</div>
    ),
  },
  {
    accessorKey: 'regency_or_city',
    header: () => (
      <div className="line-clamp-1 min-w-max">Kota / Kabupaten</div>
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.regency_or_city}
      </div>
    ),
  },
  {
    accessorKey: 'mobile_phone',
    header: () => <div className="line-clamp-1 min-w-max">No. HP</div>,
  },
  {
    accessorKey: 'date_of_birth',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Lahir</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.date_of_birth}</div>
    ),
  },
  {
    accessorKey: 'job',
    header: () => <div className="line-clamp-1 min-w-max">Pekerjaan</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.job}</div>
    ),
  },
  {
    accessorKey: 'holiday',
    header: () => <div className="line-clamp-1 min-w-max">Hari Besar</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.holiday}</div>
    ),
  },
  {
    accessorKey: 'user',
    header: () => <div className="line-clamp-1 min-w-max">Nama CRO</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.user}</div>
    ),
  },

  {
    id: 'assign-date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Assign</div>,
    cell: ({ row }) => {
      const assignedDate = row.original.assigned_date;
      return <div className="line-clamp-1 min-w-max">{assignedDate}</div>;
    },
  },

  {
    id: 'fu-date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal FU</div>,
    cell: ({ row }) => {
      const followUpRow = row.original.follow_up;
      const followUpDate =
        followUpRow.length > 0
          ? followUpRow[followUpRow.length - 1].follow_up_date
          : '';
      return <div className="line-clamp-1 min-w-max">{followUpDate}</div>;
    },
  },
  {
    id: 'fu-status',
    header: () => <div className="line-clamp-1 min-w-max">Status FU</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">
        {row.original.follow_up_status}
      </div>
    ),
  },
  {
    id: 'fu-detail',
    header: () => <div className="line-clamp-1 min-w-max">Keterangan FU</div>,
    cell: ({ row }) => {
      const followUpRow = row.original.follow_up;
      const followUpDetail =
        followUpRow.length > 0
          ? followUpRow[followUpRow.length - 1].follow_up_detail
          : '';
      return <div className="line-clamp-1 min-w-max">{followUpDetail}</div>;
    },
  },

  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  // },
  // {
  //   accessorKey: 'amount',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Amount"
  //       className="justify-end"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue('amount'));
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
];
