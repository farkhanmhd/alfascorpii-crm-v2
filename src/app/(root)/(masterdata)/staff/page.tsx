import React from 'react';
import DataTable from './data-table';
import { columns, payments } from './columns';

const Page = () => {
  return <DataTable columns={columns} data={payments} />;
};
export default Page;
