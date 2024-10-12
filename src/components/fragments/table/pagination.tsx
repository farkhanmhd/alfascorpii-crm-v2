'use client';

import React, { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeft,
  ArrowRight,
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
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '40', label: '40' },
  { value: '50', label: '50' },
];

const DataTablePagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const initialLimit = params.get('limit') || '10'; // Default to '10' if not set
  const [limit, setLimit] = useState(initialLimit);

  const handleLimitChange = (value: string) => {
    setLimit(value);
    if (value === '10') {
      params.delete('limit');
    } else {
      params.set('limit', value);
    }
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFirstPage = () => {
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLastPage = () => {
    params.set('page', totalPages.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      params.set('page', (currentPage + 1).toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      params.set('page', (currentPage - 1).toString());
      if (currentPage - 1 === 1) params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-between bg-background py-6">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select value={limit} onValueChange={handleLimitChange}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
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
          >
            <span className="sr-only">Go to first page</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
