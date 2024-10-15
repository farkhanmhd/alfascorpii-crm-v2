'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import DataTableColumnHeader from '@/components/fragments/table/datacolumntable';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    header: () => <div className="text-right">Actions</div>,
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '14a9f521',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.net',
  },
  {
    id: '7e4c11b8',
    amount: 500,
    status: 'pending',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3b2f9c46',
    amount: 75,
    status: 'failed',
    email: 'bob.johnson@yahoo.com',
  },
  {
    id: '9f5a7d23',
    amount: 200,
    status: 'processing',
    email: 'alice.williams@example.io',
  },
  {
    id: '1a2b3c4d',
    amount: 150,
    status: 'success',
    email: 'mike.davis@example.org',
  },
  {
    id: '6f5g4h2j',
    amount: 300,
    status: 'pending',
    email: 'emily.chen@example.edu',
  },
  {
    id: '8k7l9m0n',
    amount: 400,
    status: 'processing',
    email: 'david.lee@example.gov',
  },
  {
    id: '2p3q4r5t',
    amount: 100,
    status: 'failed',
    email: 'sarah.taylor@example.biz',
  },
  {
    id: '4x5y6z7w',
    amount: 250,
    status: 'success',
    email: 'kevin.white@example.info',
  },
  {
    id: '0v9b8n7m',
    amount: 500,
    status: 'pending',
    email: 'olivia.martin@example.name',
  },
];
