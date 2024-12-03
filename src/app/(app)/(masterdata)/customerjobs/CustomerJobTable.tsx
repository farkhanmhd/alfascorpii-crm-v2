import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchCustomerJobs } from '@/app/lib/data/customerjobs';
import { SearchParamsProps } from '@/types';
import columns from './columns';

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

  const { jobs, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={jobs}
      totalPages={totalPages}
      currentPage={Number(page)}
      rows={total}
      addLabel="Tambah Pekerjaan"
      searchPlaceholder="Cari Pekerjaan"
    />
  );
};

export default CustomerJobTable;
