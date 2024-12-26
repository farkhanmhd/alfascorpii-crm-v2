import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { getFollowUps } from '@/app/lib/data/follow-up';
import { SearchParamsProps } from '@/types';
import { columns } from './columns';
import FollowUpFooter from './FollowUpFooter';

const FollowUpTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const {
    followupqueues,
    last_page: totalPages,
    total,
  } = await getFollowUps(search, page, perPage);

  return (
    <DataTable
      columns={columns}
      data={followupqueues}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    >
      <FollowUpFooter />
    </DataTable>
  );
};

export default FollowUpTable;
