'use client';

import React from 'react';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';
import { RandomAssignDialog, SendCroDialog } from './dialogs';

type Props = {
  rowSelection: Record<string, boolean>;
};

const FollowUpFooter = ({ rowSelection }: Props) => {
  return (
    <footer className="flex flex-col gap-4 pt-6 sm:flex-row">
      <ExcelDropzoneDialog />
      {Object.keys(rowSelection).length === 0 ? (
        <RandomAssignDialog />
      ) : (
        <SendCroDialog selectedRows={rowSelection} />
      )}
    </footer>
  );
};

export default FollowUpFooter;
