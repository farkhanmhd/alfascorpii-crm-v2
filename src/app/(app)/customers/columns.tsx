'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'next-view-transitions';
import { Pencil } from 'lucide-react';
import { Column } from '@/types';
import type { CustomerPage } from '@/app/lib/data/customers';

const columns: Column<CustomerPage>[] = [
  {
    header: 'Dealer Code',
    GetCellContent: (data: CustomerPage) =>
      data.purchases[0].purchase.purchaseDealers[0].dealer.dealerCode,
  },
  {
    header: 'Dealer',
    GetCellContent: (data: CustomerPage) =>
      data.purchases[0].purchase.purchaseDealers[0].dealer.dealerName,
  },
  {
    header: 'Customer',
    key: 'name',
    GetCellContent: (data: CustomerPage) => data.name,
  },
  {
    header: 'Address',
    key: 'address',
    GetCellContent: (data: CustomerPage) => data.address,
  },
  {
    header: 'Phone',
    key: 'phoneNumber',
    GetCellContent: (data: CustomerPage) => data.phoneNumber,
  },
  {
    header: 'Action',
    GetCellContent: (data: CustomerPage) => (
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }))}
        href={`/customers/${data.id}`}
      >
        <Pencil />
      </Link>
    ),
  },
];

export default columns;
