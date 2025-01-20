import React from 'react';
import { getFollowUps } from '@/app/lib/data/follow-up';
import { SearchParamsProps, SelectOptions } from '@/types';
import { getAllUsers } from '@/app/lib/actions/staff';
import { columns } from './columns';
import FollowUpTableData from './FollowUpTableData';

const FollowUpTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const {
    customers,
    last_page: totalPages,
    total,
  } = await getFollowUps(search, page, perPage);

  const users = (await getAllUsers()) as SelectOptions[];

  return (
    <FollowUpTableData
      columns={columns}
      data={customers}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      users={users}
    />
  );
};

export default FollowUpTable;
