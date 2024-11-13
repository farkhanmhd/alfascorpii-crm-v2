'use client';

import React from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

const Tablesearch = ({ placeholder }: { placeholder: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useTransitionRouter();

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
    <Input
      placeholder={placeholder}
      className="w-full md:max-w-sm"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search')?.toString()}
    />
  );
};

export default Tablesearch;
