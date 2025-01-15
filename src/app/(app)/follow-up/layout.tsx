'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { actionDialog } = useActionDialog();

  return (
    <div className="flex min-h-[calc(100dvh-132px)] flex-col lg:h-[calc(100dvh-132px)]">
      {children}
      {actionDialog?.create && <ExcelDropzoneDialog />}
    </div>
  );
};

export default Layout;
