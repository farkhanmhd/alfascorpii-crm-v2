'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TableLayout from '@/components/fragments/table/TableLayout';
import TableLayoutConfig from '../table-layout-config';

const MasterDataLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const config = TableLayoutConfig.find((item) => pathname === item.pathname);

  if (!config) {
    return <div>404 - Configuration not found</div>; // Handle missing configuration
  }

  type RouteType = typeof config.type;
  return (
    <div className="flex h-full max-h-[calc(100dvh-48px)] flex-col gap-y-6">
      <TableLayout<RouteType>
        CreateDialog={config.CreateDialog}
        EditDialog={config.EditDialog}
        DeleteDialog={config.DeleteDialog}
        searchPlaceholder={config.searchPlaceholder}
        addButtonLabel={config.addButtonLabel}
      >
        {children}
      </TableLayout>
    </div>
  );
};

export default MasterDataLayout;
