import React from 'react';
import { getDuplicatedData } from '@/app/lib/data/follow-up';
import { getAllUsers } from '@/app/lib/actions/staff';
import { SelectOptions } from '@/types';
import DuplicateTableData from './DuplicateTableData';
import { columns } from './columns';

const DuplicateTable = async (params: any) => {
  const {
    duplicatedatas,
    lastPage: totalPages,
    total,
  } = await getDuplicatedData(params);

  const users = (await getAllUsers()) as SelectOptions[];

  return (
    <DuplicateTableData
      columns={columns}
      data={duplicatedatas}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(params.page)}
      users={users}
    />
  );
};

export default DuplicateTable;
