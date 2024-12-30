import React, { useState } from 'react';
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
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '150', label: '150' },
  { value: '200', label: '200' },
];

const RowLimit = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const initialPerPage = params.get('per_page') || '50';
  const [perPage, setperPage] = useState(initialPerPage);

  const handleperPageChange = (value: string) => {
    setperPage(value);
    if (value === '50') {
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
      <Select value={perPage} onValueChange={handleperPageChange}>
        <SelectTrigger className="h-8 w-[70px]">
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
