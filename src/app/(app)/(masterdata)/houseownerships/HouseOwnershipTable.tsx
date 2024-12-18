import React from 'react';
import { fetchHouseOwnerships } from '@/app/lib/data/houseownerships';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
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
    <>
      <DataTable columns={columns} data={houseownerships} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default HouseOwnershipTable;
