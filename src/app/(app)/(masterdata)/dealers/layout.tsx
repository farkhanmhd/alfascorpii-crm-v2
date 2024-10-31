import React from 'react';
import TableContainerHeader from '@/components/fragments/table/TableContainerHeader';
import Tablesearch from '@/components/fragments/table/tablesearch';
import AddButton from '@/components/fragments/buttons/AddButton';

interface LayoutProps {
  children: React.ReactNode;
  action: React.ReactNode;
  create: React.ReactNode;
}

const Layout = ({ children, action, create }: LayoutProps) => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <TableContainerHeader>
          <Tablesearch placeholder="Search pekerjaan" />
          <AddButton>Add Dealer</AddButton>
        </TableContainerHeader>
        {children}
      </div>
      {action}
      {create}
    </>
  );
};

export default Layout;
