import React from 'react';
import { SearchParamsProps } from '@/types';
import { fetchRelation } from '@/app/lib/data/relations';
import RelationTableWrapper from './RelationTableWrapper';

const RelationTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await fetchRelation(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  return <RelationTableWrapper data={data} page={page!} />;
};

export default RelationTable;
