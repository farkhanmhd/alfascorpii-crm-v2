import React from 'react';
import { fetchMotorcycles } from '@/app/lib/data/productpreferences';
import { DataTable } from '@/components/fragments/table/DataTable';
import { SearchParamsProps } from '@/types';
import DataTablePagination from '@/components/fragments/table/pagination';
import columns from './columns';

const ProductPreferenceTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchMotorcycles(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { motorcycles, last_page: totalPages, total } = data;

  return (
    <>
      <DataTable columns={columns} data={motorcycles} rows={total} />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default ProductPreferenceTable;
