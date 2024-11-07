'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react'; // Assuming you're using Lucide for icons
import { useCustomerFilters } from '@/hooks';
import MapItems from '@/utils/MapItems';

const SelectedFilters = () => {
  const { customerFilters, setCustomerFilters } = useCustomerFilters();

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
      <div className="flex max-h-max flex-wrap gap-2 self-center rounded-lg">
        {selectedFilters.length > 0 ? (
          <MapItems
            of={selectedFilters}
            render={([key, value]) => (
              <Badge
                key={key}
                className="flex items-center gap-1 capitalize"
                variant="outline"
              >
                {`${key.replace(/([A-Z])/g, ' $1')}: ${value?.replace(/([A-Z])/g, ' $1')}`}
                <button
                  onClick={() => handleRemoveFilter(key)}
                  className="ml-1 rounded p-1 hover:bg-muted"
                  aria-label={`Remove ${key}`}
                >
                  <XIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </Badge>
            )}
          />
        ) : (
          <p className="text-sm text-muted-foreground">No filters selected</p>
        )}
      </div>
      <Button>Filter</Button>
    </div>
  );
};

export default SelectedFilters;
