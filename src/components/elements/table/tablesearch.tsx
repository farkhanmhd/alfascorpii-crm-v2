'use client';

import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import RowLimit from './row-limit';

const Tablesearch = ({ placeholder }: { placeholder: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('page', '1');
      params.set('search', term);
    } else {
      params.delete('search');
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <RowLimit />
      <div className="relative w-full md:max-w-sm">
        <Input
          className="peer h-10 w-full pe-9 ps-9"
          placeholder={placeholder}
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('search')?.toString()}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>
    </>
  );
};

export default Tablesearch;
