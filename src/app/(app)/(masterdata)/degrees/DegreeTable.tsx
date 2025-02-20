import React from 'react';
import { fetchDegree } from '@/app/lib/data/degrees';
import { SearchParamsProps } from '@/types';
import DegreeTableWrapper from './DegreeTableWrapper';

const DegreeTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchDegree(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <DegreeTableWrapper data={data} page={page!} />;
};

export default DegreeTable;
