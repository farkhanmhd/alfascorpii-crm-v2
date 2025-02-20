import React from 'react';
import { fetchCustomerJobs } from '@/app/lib/data/customerjobs';
import { SearchParamsProps } from '@/types';
import CustomerJobTableWrapper from './CustomerJobTableWrapper';

const CustomerJobTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchCustomerJobs(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <CustomerJobTableWrapper data={data} page={page!} />;
};

export default CustomerJobTable;
