import React from 'react';
import { SearchParamsProps } from '@/types';
import { fetchServiceTypes } from '@/app/lib/data/servicetypes';
import ServiceTypesTableWrapper from './ServiceTypesTableWrapper';

const ServiceTypesTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchServiceTypes(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <ServiceTypesTableWrapper data={data} page={page!} />;
};

export default ServiceTypesTable;
