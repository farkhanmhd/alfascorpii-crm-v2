'use client';

import React, { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '150', label: '150' },
  { value: '200', label: '200' },
];

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  selectedRows: number;
  totalRows: number;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  selectedRows,
  totalRows,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, push } = useTransitionRouter();
  const params = new URLSearchParams(searchParams);
  const initialPerPage = params.get('per_page') || '50';
  const [perPage, setperPage] = useState(initialPerPage);

  const handleperPageChange = (value: string) => {
    setperPage(value);
    if (value === '20') {
      params.delete('per_page');
    } else {
      params.set('per_page', value);
    }
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFirstPage = () => {
    params.delete('page');
    push(`${pathname}?${params.toString()}`);
  };

  const handletotalPages = () => {
    params.set('page', totalPages.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      params.set('page', (currentPage + 1).toString());
      push(`${pathname}?${params.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      params.set('page', (currentPage - 1).toString());
      if (currentPage - 1 === 1) params.delete('page');
      push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-between bg-background py-4">
      <p className="flex-1 text-sm text-muted-foreground">
        {selectedRows > 0
          ? `${selectedRows} of ${totalRows} row(s) selected.`
          : ``}
      </p>
      <div className="flex gap-x-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows</p>
          <Select value={perPage} onValueChange={handleperPageChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {options.map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handletotalPages}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
