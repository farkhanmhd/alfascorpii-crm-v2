import React from 'react';
import { DataTable } from '@/components/fragments/table/DataTable';
import { getCustomers } from '@/app/lib/data/customers';
import { SearchParamsProps, ICustomer } from '@/types';
import Modal from '@/components/fragments/dialogs/Modal';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { columns } from './columns';
import CroList from './CroList';

const CustomerTable = async ({ search, page, perPage }: SearchParamsProps) => {
  const data = await getCustomers(search, page, perPage);

  const { totalRows, totalPages } = data;
  const customers = data.customers as ICustomer[];

  return (
    <DataTable
      columns={columns}
      data={customers}
      totalPages={totalPages}
      currentPage={Number(page)}
      rows={totalRows}
    >
      <Modal title="Assign 150 Customer to CRO: " label="Assign 150 Customer">
        <form className="flex flex-col gap-y-8">
          <CroList />
          <SubmitButton>Submit</SubmitButton>
        </form>
      </Modal>
    </DataTable>
  );
};

export default CustomerTable;
