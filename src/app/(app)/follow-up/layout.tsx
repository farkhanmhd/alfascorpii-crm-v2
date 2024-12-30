'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import ExcelDropzoneDialog from '@/components/ExcelDropzoneDialog';
import SendCroDialog from './SendCroDialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { actionDialog } = useActionDialog();

  return (
    <div className="flex h-[calc(100dvh-140px)] flex-col">
      {children}
      {actionDialog?.create && <ExcelDropzoneDialog />}
      {actionDialog?.open && <SendCroDialog />}
    </div>
  );
};

export default Layout;
