import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { randomUUID } from 'crypto';
import TableSkeleton from '@/components/elements/table/TableSkeleton';
import Tablesearch from '@/components/elements/table/tablesearch';
import { getAllUsers } from '@/app/lib/actions/staff';
import { getAllDealersList } from '@/app/lib/data/dealers';
import { getFuDetailOptions } from '@/app/lib/data/detailfu';
import { getFuResultOptions } from '@/app/lib/data/furesult';
import { getAllMotorcyclesList } from '@/app/lib/data/motorcycles';
import { getHolidayOptions } from '@/app/lib/data/holidays';
import { getJobOptions } from '@/app/lib/data/customerjobs';
import { SelectOptions } from '@/types';
import CustomerTable from './CustomerTable';
import CustomerFilters from './filters';
import Footer from './footer';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of Customers',
};

const Page = async (props: { searchParams?: Promise<any> }) => {
  const searchParams = await props?.searchParams;
  const search = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const perPage = searchParams?.per_page || '10';
  const userId = searchParams?.user_id;
  const fuDetailId = searchParams?.follow_up_detail_id;
  const fuResultId = searchParams?.follow_up_result_id;
  const dealerId = searchParams?.dealer_id;
  const dateField = searchParams?.date_field;
  const dateFrom = searchParams?.date_from;
  const dateTo = searchParams?.date_to;
  const motorcycleId = searchParams?.motorcycle_id;
  const statusFu = searchParams?.follow_up_status;

  const filters: any = {
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
    follow_up_status: statusFu,
  };

  const users = await getAllUsers();
  const motorcycles = await getAllMotorcyclesList();
  const dealers = await getAllDealersList();
  const fuDetails = await getFuDetailOptions();
  const fuResults = await getFuResultOptions();
  const holidayOptions = await getHolidayOptions();
  const jobOptions = await getJobOptions();

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

  holidayOptions.unshift({
    label: 'Semua',
    value: 'all',
  });

  fuResults.unshift({
    label: 'Semua',
    value: 'all',
  });

  fuDetails.unshift({
    label: 'Semua',
    value: 'all',
  });

  jobOptions.unshift({
    label: 'Semua',
    value: 'all',
  });

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
    <div className="grid grid-rows-[auto_1fr] gap-y-6">
      <header className="flex flex-col gap-y-6">
        <CustomerFilters
          users={users}
          motorcycles={motorcycles}
          dealers={dealers}
          fuDetails={fuDetails}
          fuResults={fuResults}
          holidays={holidayOptions}
          jobs={jobOptions}
        />
        <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <Tablesearch placeholder="Cari Customer" />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton />} key={randomUUID()}>
        <CustomerTable {...filters} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Page;
