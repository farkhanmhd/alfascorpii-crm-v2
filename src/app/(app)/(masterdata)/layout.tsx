'use client';

import React from 'react';
import TableLayout from '@/components/elements/table/TableLayout';

const MasterDataLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <TableLayout>{children}</TableLayout>
    </div>
  );
};

export default MasterDataLayout;
