'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
// import { MoreHorizontal } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { PhoneCall } from 'lucide-react';

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: 'customer_name',
    header: 'Name',
  },
  {
    accessorKey: 'district',
    header: 'District',
  },
  {
    accessorKey: 'customer_address',
    header: 'Address',
  },
  {
    accessorKey: 'mobile_phone',
    header: 'Phone',
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
  {
    id: 'actions',
    header: () => <div className="text-right">Aksi</div>,
    cell: () => {
      // const customer = row.original;
      return (
        // <div className="flex items-center justify-end space-x-2">
        //   <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //       <Button
        //         variant="ghost"
        //         className="ml-auto h-8 w-8 p-0"
        //         data-name="actions"
        //       >
        //         <span className="sr-only">Open menu</span>
        //         <MoreHorizontal className="h-4 w-4" />
        //       </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end">
        //       <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        //       {/* <DropdownMenuItem
        //         className="cursor-pointer"
        //         onClick={() =>
        //           navigator.clipboard.writeText(String(customer.id))
        //         }
        //       >
        //         Follow Up
        //       </DropdownMenuItem> */}
        //       <DropdownMenuItem className="p-0">
        //         <Link
        //           className="block h-full w-full rounded-sm px-2 py-1.5"
        //           href={`/customers/${customer.id}`}
        //         >
        //           View Customer
        //         </Link>
        //       </DropdownMenuItem>
        //     </DropdownMenuContent>
        //   </DropdownMenu>
        // </div>
        <div className="flex justify-end gap-x-4">
          <Link
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: 'outline',
              })
            )}
            href="/follow-up/new"
          >
            <PhoneCall />
          </Link>
        </div>
      );
    },
  },
];
