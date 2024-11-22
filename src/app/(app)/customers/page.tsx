import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Tablesearch from '@/components/fragments/table/tablesearch';
import TableSkeleton from '@/components/fragments/table/TableSkeleton';
import { SearchParamsProps } from '@/types';
import {
  validateSearchQuery,
  createQueryParams,
} from '@/app/lib/data/fetchUtils';
import { searchQuerySchema } from '@/validation/schemas';
import CustomerTable from './CustomerTable';
import SelectedFilters from './selected-filters';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of Customers',
};

const Page = async (props: { searchParams?: Promise<SearchParamsProps> }) => {
  const searchParams = await props?.searchParams;
  const validatedParams = validateSearchQuery(
    searchQuerySchema,
    searchParams as SearchParamsProps
  );
  createQueryParams(validatedParams);
  const search = searchParams?.search || '';
  const page = searchParams?.page || '1';
  const perPage = searchParams?.per_page || '20';
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr_auto] gap-y-4">
      <SelectedFilters />
      <TableContainerHeader>
        <Tablesearch placeholder="Search Customer" />
        <Link
          href="/customers/add"
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          Add Customer
        </Link>
      </TableContainerHeader>
      <Suspense fallback={<TableSkeleton />}>
        <CustomerTable page={page} search={search} per_page={perPage} />
      </Suspense>
    </div>
  );
};

export default Page;
