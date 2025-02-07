'use client';

import React from 'react';

interface TableLayoutProps {
  children: React.ReactNode;
}

const TableLayout = ({ children }: TableLayoutProps) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-y-6">{children}</div>
  );
};

export default TableLayout;
