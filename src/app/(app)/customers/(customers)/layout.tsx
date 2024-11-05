'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <TableContainerHeader>
        <Tablesearch placeholder="Search Customer" />
        <Button className="w-fit">Add Customer</Button>
      </TableContainerHeader>
      {children}
    </div>
  );
};

export default Layout;
