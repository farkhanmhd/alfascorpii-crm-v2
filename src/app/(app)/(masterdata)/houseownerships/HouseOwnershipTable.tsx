import React from 'react';
import { fetchHouseOwnerships } from '@/app/lib/data/houseownerships';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

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

  const { houseownerships, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={houseownerships}
      addLabel="Add House Ownership"
      totalPages={totalPages}
      currentPage={Number(page)}
      rows={total}
      searchPlaceholder="Search House Ownership"
    />
  );
};

export default HouseOwnershipTable;
