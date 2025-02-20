'use client';

import React from 'react';
import DataTablePagination from '@/components/elements/table/pagination';
import { useSearchParams } from 'next/navigation';
import { useCustomerPage } from './CustomerTableData';

const Footer = () => {
  const { customerTotal } = useCustomerPage();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  return (
    <footer>
      <DataTablePagination
        total={customerTotal.totalData}
        totalPages={customerTotal.totalPages}
        currentPage={Number(currentPage)}
      />
    </footer>
  );
};

export default Footer;
