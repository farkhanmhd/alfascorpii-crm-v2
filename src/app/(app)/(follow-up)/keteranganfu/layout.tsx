'use client';

import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TableContainerHeader>
        <Tablesearch placeholder="Search Follow up" />
        <Button className="w-fit">Add Follow up</Button>
      </TableContainerHeader>
      {children}
    </>
  );
};

export default Layout;
