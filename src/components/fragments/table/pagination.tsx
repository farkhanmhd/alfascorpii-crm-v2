'use client';

import React, { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
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

import { Input } from '@/components/ui/input';

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
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const params = new URLSearchParams(searchParams);
  const initialPerPage = params.get('per_page') || '50';
  const [perPage, setperPage] = useState(initialPerPage);
  const [pageState, setPageState] = useState<number>(currentPage || 1);

  const handleperPageChange = (value: string) => {
    setperPage(value);
    if (value === '50') {
      params.delete('per_page');
    } else {
      params.set('per_page', value);
    }
    setPageState(1);
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFirstPage = () => {
    setPageState(1);
    params.delete('page');
    push(`${pathname}?${params.toString()}`);
  };

  const handletotalPages = () => {
    setPageState(totalPages);
    params.set('page', totalPages.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const handleNextPage = () => {
    setPageState(pageState + 1);
    params.set('page', (pageState + 1).toString());
    push(`${pathname}?${params.toString()}`);
  };

  const handlePrevPage = () => {
    if (pageState > 1) {
      setPageState(pageState - 1);
      params.set('page', (pageState - 1).toString());
      if (pageState - 1 === 1) {
        params.delete('page');
      }
      push(`${pathname}?${params.toString()}`);
    }
  };

  const handlePageInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newPage = pageState;

    if (pageState > totalPages) {
      newPage = totalPages;
      setPageState(newPage);
    }

    if (pageState < 1) {
      newPage = 1;
      setPageState(newPage);
    }

    params.set('page', newPage.toString());
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sticky bottom-0 py-4 sm:justify-end">
      <div className="flex justify-between gap-x-4">
        <div className="flex items-center gap-x-2">
          <p className="hidden text-sm font-medium sm:block">Per Halaman</p>
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
          <div className="flex items-center justify-center gap-x-2 text-sm font-medium">
            <span className="hidden sm:inline">Halaman</span>
            <form onSubmit={handlePageInput}>
              <Input
                className="h-8 w-[60px] text-right"
                inputMode="numeric"
                name="page"
                value={pageState}
                autoComplete="off"
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*$/.test(value)) {
                    setPageState(Number(value));
                  }
                }}
              />
            </form>
            <span>dari {totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handleFirstPage}
              disabled={pageState === 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handlePrevPage}
              disabled={pageState === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleNextPage}
              disabled={pageState === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handletotalPages}
              disabled={pageState === totalPages}
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
