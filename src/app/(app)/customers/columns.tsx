'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'next-view-transitions';
import { Pencil } from 'lucide-react';
import { ICustomer, Column } from '@/types';

const columns: Column<ICustomer>[] = [
  {
    header: 'Dealer',
    key: 'dealer',
    GetCellContent: (customer: ICustomer) => customer.dealer,
  },
  {
    header: 'Customer',
    key: 'name',
    GetCellContent: (customer: ICustomer) => customer.name,
  },
  {
    header: 'Location',
    key: 'location',
    GetCellContent: (customer: ICustomer) => customer.location,
  },
  {
    header: 'Phone',
    key: 'phone',
    GetCellContent: (customer: ICustomer) => customer.phone,
  },
  {
    header: 'Motor',
    key: 'motor',
    GetCellContent: (customer: ICustomer) => customer.motor,
  },
  {
    header: 'Follow Up',
    key: 'follow_up',
    GetCellContent: (customer: ICustomer) => customer.follow_up,
  },
  {
    header: 'Action',
    GetCellContent: (customer: ICustomer) => (
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }))}
        href={`/customers/${customer.id}`}
      >
        <Pencil />
      </Link>
    ),
  },
];

export default columns;
