import React from 'react';
import { fetchDetailFU } from '@/app/lib/data/detailfu';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const FuDetailTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDetailFU(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { detailfu, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={detailfu}
      addLabel="Add FU Detail"
      totalPages={totalPages}
      currentPage={Number(page)}
      rows={total}
      searchPlaceholder="Search FU Detail"
    />
  );
};

export default FuDetailTable;
