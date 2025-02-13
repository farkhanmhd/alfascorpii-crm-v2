import React, { Suspense } from 'react';
import { Metadata } from 'next';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import Tablesearch from '@/components/elements/table/tablesearch';
import { randomUUID } from 'crypto';
import { getJobOptions } from '@/app/lib/data/customerjobs';
import { getAllDealersList } from '@/app/lib/data/dealers';
import { getFuDetailOptions } from '@/app/lib/data/detailfu';
import { getExpenseOptions } from '@/app/lib/data/expenses';
import { getFuMethodOptions } from '@/app/lib/data/fumethod';
import { getFuResultOptions } from '@/app/lib/data/furesult';
import { getHobbyOptions } from '@/app/lib/data/hobbies';
import { getHolidayOptions } from '@/app/lib/data/holidays';
import { getHouseOwnershipOptions } from '@/app/lib/data/houseownerships';
import { getIncomeOptions } from '@/app/lib/data/incomes';
import { getLeasingOptions } from '@/app/lib/data/leasing';
import { getAllMotorcyclesList } from '@/app/lib/data/motorcycles';
import { getRelationOptions } from '@/app/lib/data/relations';
import { getServiceTypes } from '@/app/lib/data/service-type';
import { getStatusFuOptions } from '@/app/lib/data/statusfus';
import { getAllUsers } from '@/app/lib/actions/staff';
import { getDataSourceOpts } from '@/app/lib/data/datasources';
import { getColorOptions } from '@/app/lib/data/colors';
import DealFilters from './filters';
import FollowUpTable from './FollowUpTable';

export const metadata: Metadata = {
  title: 'Follow Up',
  description: 'List Follow Up',
};

const Page = async (props: { searchParams?: Promise<any> }) => {
  const searchParams = await props?.searchParams;
  const search = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const perPage = searchParams?.per_page || '50';
  const userId = searchParams?.user_id;
  const motorcycleId = searchParams?.motorcycle_id;
  const dealerId = searchParams?.dealer_id;
  const dateField = searchParams?.date_field;
  const dateFrom = searchParams?.date_from;
  const dateTo = searchParams?.date_to;

  const params = {
    search,
    page,
    per_page: perPage,
    user_id: userId,
    motorcycle_id: motorcycleId,
    dealer_id: dealerId,
    date_field: dateField,
    date_from: dateFrom,
    date_to: dateTo,
  };

  const userOpts = await getAllUsers();
  userOpts.unshift({
    label: 'Semua',
    value: 'all',
  });

  const options = {
    motorcyclesOpts: await getAllMotorcyclesList(),
    holidayOpts: await getHolidayOptions(),
    jobOpts: await getJobOptions(),
    relationOpts: await getRelationOptions(),
    fuDetailOpts: await getFuDetailOptions(),
    fuResultOpts: await getFuResultOptions(),
    fuMethodOpts: await getFuMethodOptions(),
    fuStatusOpts: await getStatusFuOptions(),
    incomeOpts: await getIncomeOptions(),
    expenseOpts: await getExpenseOptions(),
    hobbyOpts: await getHobbyOptions(),
    houseOwnershipOpts: await getHouseOwnershipOptions(),
    dealerOpts: await getAllDealersList(),
    leasingOpts: await getLeasingOptions(),
    colorOpts: await getColorOptions(),
    serviceTypeOpts: await getServiceTypes(),
    userOpts,
    dataSourceOpts: await getDataSourceOpts(),
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-y-6">
      <header className="flex flex-col gap-y-6">
        <DealFilters {...options} />
        <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <Tablesearch placeholder="Cari Customer" />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton />} key={randomUUID()}>
        <FollowUpTable {...params} />
      </Suspense>
    </div>
  );
};

export default Page;
