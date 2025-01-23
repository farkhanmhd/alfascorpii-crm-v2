'use client';

import React from 'react';
import TableLayout from '@/components/elements/table/TableLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[calc(100dvh-132px)] flex-col">
      <TableLayout>{children}</TableLayout>
    </div>
  );
};

export default Layout;
