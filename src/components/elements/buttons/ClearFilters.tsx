'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ClearFilters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClearFilters = () => {
    replace(pathname);
  };

  return (
    <div className="flex w-full items-end gap-2">
      <Button variant="outline" onClick={handleClearFilters} className="w-full">
        Clear Filters
      </Button>
    </div>
  );
};

export default ClearFilters;
