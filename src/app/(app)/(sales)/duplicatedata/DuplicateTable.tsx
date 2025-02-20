import React from 'react';
import { getDuplicatedData } from '@/app/lib/data/follow-up';
import { getAllUsers } from '@/app/lib/actions/staff';
import { SelectOptions } from '@/types';
import DuplicateTableWrapper from './DuplicateTableWrapper';

const DuplicateTable = async (params: any) => {
  const data = await getDuplicatedData(params);
  const users = (await getAllUsers()) as SelectOptions[];

  return (
    <DuplicateTableWrapper data={data} users={users} page={params.page!} />
  );
};

export default DuplicateTable;
