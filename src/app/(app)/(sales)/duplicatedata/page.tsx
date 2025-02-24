import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import { getAllUsers } from '@/app/lib/actions/staff';
import { getAllDealersList } from '@/app/lib/data/dealers';
import { getAllMotorcyclesList } from '@/app/lib/data/motorcycles';
import Tablesearch from '@/components/elements/table/tablesearch';
import { SelectOptions } from '@/types';
import DuplicateTable from './DuplicateTable';
import DuplicateFilters from './filters';
import DuplicateFooter from './DuplicateFooter';

export const metadata: Metadata = {
  title: 'Follow Up',
  description: 'List Follow Up',
};

const Page = async (props: { searchParams?: Promise<any> }) => {
  const searchParams = await props?.searchParams;
  const search = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const perPage = searchParams?.per_page || '10';
  const dealerId = searchParams?.dealer_id;
  const dateField = searchParams?.date_field;
  const dateFrom = searchParams?.date_from;
  const dateTo = searchParams?.date_to;
  const motorcycleId = searchParams?.motorcycle_id;
  const userId = searchParams?.user_id;

  const filters: any = {
    search,
    page,
    per_page: perPage,
    user_id: userId,
    dealer_id: dealerId,
    date_field: dateField,
    date_from: dateFrom,
    date_to: dateTo,
    motorcycle_id: motorcycleId,
  };

  const users = await getAllUsers();
  users.unshift(
    {
      label: 'Semua',
      value: 'all',
    },
    {
      label: 'Not Assigned',
      value: 'not_assigned',
    }
  );
  const motorcycles = await getAllMotorcyclesList();
  const dealers = await getAllDealersList();
  motorcycles.sort((a: SelectOptions, b: SelectOptions) =>
    a.label.localeCompare(b.label)
  );

  motorcycles.unshift({
    label: 'Semua',
    value: '',
  });

  dealers.sort((a: SelectOptions, b: SelectOptions) =>
    a.label.localeCompare(b.label)
  );

  dealers.unshift({
    label: 'Semua',
    value: '',
  });
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <header className="flex flex-col gap-y-6 pb-6">
        <DuplicateFilters
          users={users}
          motorcycles={motorcycles}
          dealers={dealers}
        />
        <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <Tablesearch placeholder="Cari Customer" />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton />}>
        <DuplicateTable {...filters} />
      </Suspense>
      <DuplicateFooter />
    </div>
  );
};

export default Page;
