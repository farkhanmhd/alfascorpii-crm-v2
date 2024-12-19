'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { actionDialog } = useActionDialog();

  return (
    <div className="flex h-[calc(100dvh-48px)] flex-col overflow-hidden">
      {children}
      {actionDialog?.create && <ExcelDropzoneDialog />}
    </div>
  );
};

export default Layout;
