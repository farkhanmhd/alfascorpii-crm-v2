import React from 'react';
import { getFollowUps, IFUFilters } from '@/app/lib/data/follow-up';
import { SelectOptions } from '@/types';
import { getAllUsers } from '@/app/lib/actions/staff';
import { columns } from './columns';
import FollowUpTableData from './FollowUpTableData';

const FollowUpTable = async (params: IFUFilters) => {
  const { customers, lastPage: totalPages, total } = await getFollowUps(params);

  const users = (await getAllUsers()) as SelectOptions[];

  return (
    <FollowUpTableData
      columns={columns}
      data={customers}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(params.page)}
      users={users}
    />
  );
};

export default FollowUpTable;
