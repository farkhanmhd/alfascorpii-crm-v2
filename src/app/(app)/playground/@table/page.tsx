import React, { Suspense } from 'react';
import {
  validateSearchQuery,
  createQueryParams,
} from '@/app/lib/data/fetchUtils';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import { searchQuerySchema } from '@/validation/schemas';
import { SearchParamsProps } from '@/types';
import CustomerTable from './customer-table';

const CustomerTablePage = async (props: {
  searchParams?: Promise<SearchParamsProps>;
}) => {
  const searchParams = await props?.searchParams;
  const validatedParams = validateSearchQuery(
    searchQuerySchema,
    searchParams as SearchParamsProps
  );
  createQueryParams(validatedParams);
  const searchQuery = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const perPage = searchParams?.per_page || '20';
  return (
    <Suspense fallback={<TableSkeleton />}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-auto">
        <CustomerTable
          page={Number(page)}
          searchQuery={searchQuery}
          perPage={Number(perPage)}
        />
      </div>
    </Suspense>
  );
};

export default CustomerTablePage;
