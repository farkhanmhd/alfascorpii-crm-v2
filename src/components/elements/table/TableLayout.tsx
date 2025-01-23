'use client';

import React from 'react';

interface TableLayoutProps {
  children: React.ReactNode;
}

const TableLayout = ({ children }: TableLayoutProps) => {
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto]">{children}</div>
  );
};

export default TableLayout;
