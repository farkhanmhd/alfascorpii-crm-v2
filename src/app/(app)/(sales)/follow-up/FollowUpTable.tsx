import React from 'react';
import { getFollowUps, IFUFilters } from '@/app/lib/data/follow-up';
import { SelectOptions } from '@/types';
import { getAllUsers } from '@/app/lib/actions/staff';
import FollowUpTableWrapper from './FollowUpTableWrapper';

const FollowUpTable = async (params: IFUFilters) => {
  const data = await getFollowUps(params);

  const users = (await getAllUsers()) as SelectOptions[];

  return <FollowUpTableWrapper data={data} users={users} page={params.page!} />;
};

export default FollowUpTable;
