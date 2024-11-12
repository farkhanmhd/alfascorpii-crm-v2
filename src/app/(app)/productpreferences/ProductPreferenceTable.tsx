import React from 'react';
import DataTable from '@/components/fragments/table/DataTable';
import columns from './columns';
import { fetchProductPreferences } from '@/app/lib/data/productpreferences';
import DataTablePagination from '@/components/fragments/table/pagination';

interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

const ProductPreferenceTable = async ({
  search,
  page,
  perPage,
}: SearchParamsProps) => {
  const data = await fetchProductPreferences(search, page, perPage);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        Failed to fetch data
      </div>
    );
  }

  const { productpreferences, last_page: totalPages } = data;
  return (
    <>
      <DataTable columns={columns} data={productpreferences} includeIndex />
      <DataTablePagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
};

export default ProductPreferenceTable;
