import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchHouseOwnerships } from '@/app/lib/data/houseownerships';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

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

  const { houseownerships, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={houseownerships} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default HouseOwnershipTable;
