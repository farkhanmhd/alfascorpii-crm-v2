import React, { Suspense } from 'react';
import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import Tablesearch from '@/components/elements/table/tablesearch';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import { getAllUsers } from '@/app/lib/actions/staff';
import { IFUFilters } from '@/app/lib/data/follow-up';
import { getAllMotorcyclesList } from '@/app/lib/data/motorcycles';
import { getAllDealersList } from '@/app/lib/data/dealers';
import { getFuDetailOptions } from '@/app/lib/data/detailfu';
import { getFuResultOptions } from '@/app/lib/data/furesult';
import FollowUpFooter from './FollowUpFooter';

import FollowUpTable from './FollowUpTable';
import FollowUpFilters from './filters';

export const metadata: Metadata = {
  title: 'Follow Up',
  description: 'List Follow Up',
};

type Props = {
  searchParams?: Promise<IFUFilters>;
};

const Page = async (props: Props) => {
  const searchParams = await props?.searchParams;
  const search = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const perPage = searchParams?.per_page || '50';
  const userId = searchParams?.user_id;
  const fuDetailId = searchParams?.follow_up_detail_id;
  const fuResultId = searchParams?.follow_up_result_id;
  const dealerId = searchParams?.dealer_id;
  const dateField = searchParams?.date_field;
  const dateFrom = searchParams?.date_from;
  const dateTo = searchParams?.date_to;
  const motorcycleId = searchParams?.motorcycle_id;

  const filters: IFUFilters = {
    search,
    page,
    per_page: perPage,
    user_id: userId,
    follow_up_detail_id: fuDetailId,
    follow_up_result_id: fuResultId,
    dealer_id: dealerId,
    date_field: dateField,
    date_from: dateFrom,
    date_to: dateTo,
    motorcycle_id: motorcycleId,
  };

  const users = await getAllUsers();
  users.unshift({
    label: 'Semua',
    value: 'all',
  });

  const motorcycles = await getAllMotorcyclesList();
  const dealers = await getAllDealersList();

  const fuDetails = await getFuDetailOptions();
  fuDetails.unshift({
    label: 'Semua',
    value: 'all',
  });

  const fuResults = await getFuResultOptions();
  fuResults.unshift({
    label: 'Semua',
    value: 'all',
  });

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto]">
      <header className="flex flex-col gap-y-6 pb-6">
        <FollowUpFilters
          users={users}
          motorcycles={motorcycles}
          dealers={dealers}
          fuDetails={fuDetails}
          fuResults={fuResults}
        />
        <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <Tablesearch placeholder="Cari Customer" />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton />} key={randomUUID()}>
        <FollowUpTable {...filters} />
      </Suspense>
      <FollowUpFooter />
    </div>
  );
};

export default Page;
