import React from 'react';

const TableContainerHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="order-2 flex items-center justify-between gap-x-28 bg-background pb-6 pt-1 md:order-none md:pt-0">
      {children}
    </div>
  );
};

export default TableContainerHeader;
