import React from 'react';
import { getCustomers } from '@/app/lib/data/customers';
import { SearchParamsProps, ICustomer } from '@/types';
import AssignTable from './AssignTable';

const AssignData = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await getCustomers(search, page, perPage);

  const { totalRows, totalPages } = data;
  const customers = data.customers as ICustomer[];
  return (
    <AssignTable
      data={customers}
      totalPages={totalPages}
      currentPage={Number(page)}
      rows={totalRows}
    />
  );
};

export default AssignData;
