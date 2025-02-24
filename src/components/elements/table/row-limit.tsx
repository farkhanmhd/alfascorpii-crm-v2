import React, { useState, useEffect } from 'react';
import type { SelectOptions } from '@/types';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const options: SelectOptions[] = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '40', label: '40' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '150', label: '150' },
  { value: '200', label: '200' },
];

const RowLimit = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  // derive initial state from params
  const initialPerPage = searchParams.get('per_page') || '10';
  const [perPage, setPerPage] = useState(initialPerPage);

  // Sync perPage state if searchParams changes externally.
  useEffect(() => {
    const newInitial = searchParams.get('per_page') || '10';
    setPerPage(newInitial);
  }, [searchParams]);

  const handlePerPageChange = (value: string) => {
    setPerPage(value);
    const params = new URLSearchParams(searchParams);
    if (value === '10') {
      params.delete('per_page');
    } else {
      params.set('per_page', value);
    }
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-x-2">
      <span className="hidden text-sm font-medium sm:block">Show</span>
      <Select value={perPage} onValueChange={handlePerPageChange}>
        <SelectTrigger className="h-11 w-[70px]">
          <SelectValue placeholder={perPage} />
        </SelectTrigger>
        <SelectContent side="bottom">
          {options.map((option) => (
            <SelectItem key={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>Entries</span>
    </div>
  );
};

export default RowLimit;
