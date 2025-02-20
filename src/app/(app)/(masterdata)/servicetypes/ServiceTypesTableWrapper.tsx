'use client';

import React from 'react';
import { DataTable } from '@/components/elements/table/DataTable';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { editableColumns, columns } from './columns';

type Props = {
  data: any;
  page: string;
};

const ServiceTypesTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { serviceTypes, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_service_types', permissions) ||
    checkPermission('delete_service_types', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={serviceTypes}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default ServiceTypesTableWrapper;
