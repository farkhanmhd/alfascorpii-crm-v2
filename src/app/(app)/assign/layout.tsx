'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { actionDialog } = useActionDialog();
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="grid h-full grid-rows-[auto] gap-y-4">
        <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden">
          {children}
        </div>
      </div>
      {actionDialog?.create && <ExcelDropzoneDialog />}
    </div>
  );
};

export default Layout;
