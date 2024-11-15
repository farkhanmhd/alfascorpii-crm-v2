import React from 'react';

const TableContainerHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between gap-x-2 bg-background pt-1 md:order-none md:pt-0 lg:gap-x-28">
      {children}
    </div>
  );
};

export default TableContainerHeader;
