'use client';

import React from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
// import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { buttonVariants } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { ICustomer } from '@/types';
// import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
// import { useDeleteDialog } from '@/hooks';

export const columns: ColumnDef<ICustomer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <div>
        {!row.original.user && (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-x-4">
          <Link
            href={`/customers/${row.original.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'icon',
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
    id: 'assign-date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Assign</div>,
    cell: ({ row }) => {
      const assignedDate = row.original.assigned_date;
      return <div className="line-clamp-1 min-w-max">{assignedDate}</div>;
    },
  },
  {
    accessorKey: 'nik',
    header: 'NIK',
  },
  {
    accessorKey: 'customer_name',
    header: 'Nama',
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 min-w-max">
          {row.original.customer_name}
        </div>
      );
    },
  },
  {
    id: 'purchase_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Beli</div>,
    cell: ({ row }) => {
      return <div>{row.original.motorcycles[0].purchase_date}</div>;
    },
  },
  {
    id: 'dealer_area',
    header: () => <div className="line-clamp-1 min-w-max">Dealer / Area</div>,
    cell: ({ row }) => {
      const motorcycle = row.original.motorcycles;
      const dealer = motorcycle[motorcycle.length - 1].dealer_name;
      return <div className="line-clamp-1 min-w-max">{dealer}</div>;
    },
  },
  {
    id: 'frame_number',
    header: () => <div className="line-clamp-1 min-w-max">Nomor Rangka</div>,
    cell: ({ row }) => {
      return <div>{row.original.motorcycles[0].frame_number}</div>;
    },
  },
  {
    id: 'motorcycle_type',
    header: () => <div className="line-clamp-1 min-w-max">Tipe Motor</div>,
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 min-w-max">
          {row.original.motorcycles[0].name}
        </div>
      );
    },
  },
  {
    accessorKey: 'mobile_phone',
    header: 'NO. HP',
  },
  {
    accessorKey: 'user',
    header: () => <div className="line-clamp-1 min-w-max">Nama CRO</div>,
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max">{row.original.user}</div>
    ),
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
    id: 'fu_result',
    header: () => <div className="line-clamp-1 min-w-max">Hasil FU</div>,
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
  // {
  //   id: 'actions',
  //   header: () => <div className="text-right">Aksi</div>,
  //   cell: ({ row }) => {
  //     const { setDeleteDialog } = useDeleteDialog();
  //     const followUp = row.original;
  //     return (
  //       // <div className="flex items-center justify-end space-x-2">
  //       //   <DropdownMenu>
  //       //     <DropdownMenuTrigger asChild>
  //       //       <Button
  //       //         variant="ghost"
  //       //         className="ml-auto h-8 w-8 p-0"
  //       //         data-name="actions"
  //       //       >
  //       //         <span className="sr-only">Open menu</span>
  //       //         <MoreHorizontal className="h-4 w-4" />
  //       //       </Button>
  //       //     </DropdownMenuTrigger>
  //       //     <DropdownMenuContent align="end">
  //       //       <DropdownMenuLabel>Aksi</DropdownMenuLabel>
  //       //       {/* <DropdownMenuItem
  //       //         className="cursor-pointer"
  //       //         onClick={() =>
  //       //           navigator.clipboard.writeText(String(followUp.id))
  //       //         }
  //       //       >
  //       //         Follow Up
  //       //       </DropdownMenuItem> */}
  //       //       <DropdownMenuItem className="p-0">
  //       //         <Link
  //       //           className="block h-full w-full rounded-sm px-2 py-1.5"
  //       //           href={`/followUps/${followUp.id}`}
  //       //         >
  //       //           View followUp
  //       //         </Link>
  //       //       </DropdownMenuItem>
  //       //     </DropdownMenuContent>
  //       //   </DropdownMenu>
  //       // </div>
  //       <div className="flex justify-end gap-x-4">
  //         <Link
  //           className={cn(
  //             buttonVariants({
  //               size: 'sm',
  //               variant: 'outline',
  //             })
  //           )}
  //           href={`/follow-up/${followUp.id}`}
  //         >
  //           <Pencil />
  //         </Link>
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={() => setDeleteDialog({ open: true, id: row.original.id })}
  //         >
  //           <Trash />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
