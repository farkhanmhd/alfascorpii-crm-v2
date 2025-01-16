import React from 'react';
import { fetchHouseOwnerships } from '@/app/lib/data/houseownerships';
import { DataTable } from '@/components/elements/table/DataTable';
import { SearchParamsProps } from '@/types';
import columns from './columns';

const HouseOwnershipTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchHouseOwnerships(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { houseownerships, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={houseownerships}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default HouseOwnershipTable;
