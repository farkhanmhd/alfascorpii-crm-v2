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

const RelationTableWrapper = ({ data, page }: Props) => {
  const { permissions } = usePermissions();
  const { relations, last_page: totalPages, total } = data;
  const canEditOrDelete =
    checkPermission('edit_relations', permissions) ||
    checkPermission('delete_relations', permissions);

  return (
    <DataTable
      columns={canEditOrDelete ? editableColumns : columns}
      data={relations}
      rows={total}
      totalPages={totalPages}
      currentPage={Number(page)}
      withPagination
    />
  );
};

export default RelationTableWrapper;
