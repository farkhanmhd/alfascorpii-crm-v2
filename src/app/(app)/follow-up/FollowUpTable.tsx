import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { fetchCustomer } from '@/app/lib/data/customers';
import { SearchParamsProps } from '@/types';
import { columns } from './columns';
import FollowUpFooter from './FollowUpFooter';

const FollowUpTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const {
    customers,
    last_page: totalPages,
    total,
  } = await fetchCustomer(search, page, perPage);

  return (
    <DataTable
      columns={columns}
      data={customers}
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
