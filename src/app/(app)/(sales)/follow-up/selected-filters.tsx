'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react'; // Assuming you're using Lucide for icons
import { useCustomerFilters, useCustomerSheet } from '@/hooks';
import { useIsMobile } from '@/hooks/use-mobile';
import MapItems from '@/utils/MapItems';

const SelectedFilters = () => {
  const { customerFilters, setCustomerFilters } = useCustomerFilters();
  const { setOpenSheet } = useCustomerSheet();
  const isMobile = useIsMobile();

  const handleRemoveFilter = (filterKey: string) => {
    setCustomerFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: null,
    }));
  };

  const selectedFilters = Object.entries(customerFilters).filter(
    ([, value]) => value
  );

  return (
    <div className="flex justify-between gap-x-8">
      <div className="flex max-h-max max-w-[60vw] flex-1 gap-2 self-center overflow-x-auto rounded-lg sm:max-w-none md:flex-wrap">
        {selectedFilters.length > 0 ? (
          isMobile ? (
            <p className="text-sm">{selectedFilters.length} Filter Selected</p>
          ) : (
            <MapItems
              of={selectedFilters}
              render={([key, value]) => (
                <Badge
                  key={key}
                  className="flex flex-1 items-center justify-between gap-1 py-2 capitalize sm:py-1 md:flex-none"
                  variant="outline"
                >
                  <span className="line-clamp-1">
                    {`${key.replace(/([A-Z])/g, ' $1')}: ${value?.replace(/([A-Z])/g, ' $1')}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFilter(key)}
                    className="ml-1 rounded p-1 hover:bg-muted"
                    aria-label={`Remove ${key}`}
                  >
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                </Badge>
              )}
            />
          )
        ) : (
          <p className="text-sm text-muted-foreground">No filters selected</p>
        )}
      </div>
      <Button onClick={() => setOpenSheet(true)}>Filter</Button>
    </div>
  );
};

export default SelectedFilters;
