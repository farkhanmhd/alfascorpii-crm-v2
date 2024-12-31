import React from 'react';
import { fetchCustomer } from '@/app/lib/data/customers';
import { SearchParamsProps } from '@/types';
import { columns } from './columns';
import FollowUpTableData from './FollowUpTableData';

const FollowUpTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const {
    customers,
    last_page: totalPages,
    total,
  } = await fetchCustomer(search, page, perPage);

  return (
    <FollowUpTableData
      columns={columns}
      data={customers}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default FollowUpTable;
