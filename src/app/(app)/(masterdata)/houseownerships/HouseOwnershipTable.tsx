import React from 'react';
import { fetchHouseOwnerships } from '@/app/lib/data/houseownerships';
import { SearchParamsProps } from '@/types';
import HouseOwnershipTableWrapper from './HouseOwnershipTableWrapper';

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

  return <HouseOwnershipTableWrapper data={data} page={page!} />;
};

export default HouseOwnershipTable;
