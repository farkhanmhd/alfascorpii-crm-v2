'use client';

import React from 'react';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';
import { SelectOptions } from '@/types';
import { RandomAssignDialog, SendCroDialog } from './dialogs';

type Props = {
  rowSelection: Record<string, boolean>;
  users: SelectOptions[];
};

const FollowUpDialogs = ({ rowSelection, users }: Props) => {
  return (
    <footer className="flex flex-col gap-4 pt-6 sm:flex-row">
      <ExcelDropzoneDialog />
      {Object.keys(rowSelection).length === 0 ? (
        <RandomAssignDialog users={users} />
      ) : (
        <SendCroDialog selectedRows={rowSelection} users={users} />
      )}
    </footer>
  );
};

export default FollowUpDialogs;
