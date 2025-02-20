'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import DataTablePagination from '@/components/elements/table/pagination';
import {
  useDuplicateSelection,
  useFuUsers,
  useDuplicateTotal,
} from './DuplicateTableData';
import { ManualAssignDialog } from './manual-assign';
import { DeleteDuplicateDialog } from './DeleteDuplicateDialog';

const DuplicateFooter = () => {
  const searchParams = useSearchParams();
  const { permissions } = usePermissions();
  const currentPage = searchParams.get('page') || '1';
  const { duplicateSelection, setDuplicateSelection } = useDuplicateSelection();
  const { fuUsers } = useFuUsers();
  const { totalData } = useDuplicateTotal();

  const canAssign = checkPermission(
    'sales_duplicate_data_assign_to_cro',
    permissions
  );
  const canDelete = checkPermission(
    'sales_duplicate_data_delete_button',
    permissions
  );

  return (
    <div className="mt-6 flex items-center justify-between gap-x-6">
      <div className="flex max-w-max gap-x-6">
        {Object.keys(duplicateSelection).length > 0 && (
          <>
            {canAssign && (
              <ManualAssignDialog
                selectedRows={duplicateSelection}
                users={fuUsers}
              />
            )}
            {canDelete && (
              <DeleteDuplicateDialog
                selectedRows={duplicateSelection}
                setSelectedRows={setDuplicateSelection}
              />
            )}
          </>
        )}
      </div>
      <DataTablePagination
        selectedRows={Object.keys(duplicateSelection).length}
        currentPage={Number(currentPage)}
        totalPages={totalData.totalData}
        total={totalData.total}
      />
    </div>
  );
};

export default DuplicateFooter;
