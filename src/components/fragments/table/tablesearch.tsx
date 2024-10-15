'use client';

import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

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
    <div className="flex items-center justify-between bg-background pb-6">
      <Input
        placeholder={placeholder}
        className="max-w-sm"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
      <Link
        href="/staff/add"
        className="rounded-sm bg-primary px-6 py-3 text-sm text-white"
      >
        Add Staff
      </Link>
    </div>
  );
};

export default Tablesearch;
