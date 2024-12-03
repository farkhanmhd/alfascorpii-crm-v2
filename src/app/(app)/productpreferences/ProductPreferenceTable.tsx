import React from 'react';
import { fetchProductPreferences } from '@/app/lib/data/productpreferences';
import { DataTable } from '@/components/fragments/table/DataTable';
import columns from './columns';

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

  const { productpreferences, last_page: totalPages, total } = data;
  return (
    <DataTable
      columns={columns}
      data={productpreferences}
      addLabel="Add Motorcycle"
      searchPlaceholder="Search Motorcycle"
      currentPage={Number(page)}
      totalPages={totalPages}
      rows={total}
    />
  );
};

export default ProductPreferenceTable;
