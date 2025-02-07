'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
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
  const currentPage = searchParams.get('page') || '1';
  const { duplicateSelection, setDuplicateSelection } = useDuplicateSelection();
  const { fuUsers } = useFuUsers();
  const { totalData } = useDuplicateTotal();
  return (
    <div className="mt-6 flex items-center justify-between gap-x-6">
      <div className="flex max-w-max gap-x-6">
        {Object.keys(duplicateSelection).length > 0 && (
          <>
            <ManualAssignDialog
              selectedRows={duplicateSelection}
              users={fuUsers}
            />
            <DeleteDuplicateDialog
              selectedRows={duplicateSelection}
              setSelectedRows={setDuplicateSelection}
            />
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
