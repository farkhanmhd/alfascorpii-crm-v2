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
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
    id: 'assign_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal Assign</div>,
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
    header: 'Dealer / Area',
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 min-w-max">{row.original.dealer_name}</div>
      );
    },
  },
  {
    header: 'No. Rangka',
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
    id: 'cro_name',
    accessorKey: 'cro_name',
    header: () => <div className="line-clamp-1 min-w-max">Nama CRO</div>,
  },
  {
    id: 'fu_date',
    accessorKey: 'fu_date',
    header: () => <div className="line-clamp-1 min-w-max">Tanggal FU</div>,
  },
  {
    id: 'status_fu',
    header: () => <div className="line-clamp-1 min-w-max">Status FU</div>,
  },
  {
    id: 'fu_result',
    header: () => <div className="line-clamp-1 min-w-max">Hasil FU</div>,
  },
  {
    id: 'fu_detail',
    header: () => <div className="line-clamp-1 min-w-max">Detail FU</div>,
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
