'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MapItems from '@/utils/MapItems';
import { SelectOptions } from '@/types';
import { Label } from '@/components/ui/label';

interface Props {
  options: SelectOptions[];
  className?: string;
  id?: string;
  label?: string;
  placeholder: string;
  error?: string[];
  value: string;
  setValue: (value: string) => void;
  isPendingResult?: boolean;
}

export const SelectBox = ({
  options = [],
  className = '',
  label,
  error,
  id,
  placeholder,
  value,
  setValue,
  isPendingResult,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      {label && (
        <Label htmlFor={id} className="flex gap-x-2 font-semibold">
          <span>{label}</span>
          {error && error.length > 0 && (
            <span className="text-red-500">
              {error.map((errMsg) => `* ${errMsg}`).join(', ')}
            </span>
          )}
        </Label>
      )}
      <Select onValueChange={setValue} value={value}>
        <SelectTrigger className={`w-full ${className}`} id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {isPendingResult ? (
            <SelectItem value="loading">Loading...</SelectItem>
          ) : options.length === 0 ? (
            <SelectItem value="no-options">No options available</SelectItem>
          ) : (
            <MapItems
              of={options}
              render={(item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              )}
            />
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

type SelectFilterProps = {
  options: SelectOptions[];
  label: string;
  id: string;
  placeholder: string;
  value: string | undefined;
  setSelectedValue: (value: string) => void;
  // queryParams: string;
};

export const SelectFilter = ({
  options,
  label,
  id,
  placeholder,
  value,
  setSelectedValue,
  // queryParams
}: SelectFilterProps) => {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();
  // const params = new URLSearchParams(searchParams);

  // const handleChange = (value: string) => {
  //   params.set(queryParams, value);
  //   replace(`${pathname}?${params.toString()}`);
  // };

  return (
    <div className="flex flex-col gap-y-4">
      {label && (
        <Label htmlFor={id} className="flex gap-x-2 font-semibold">
          <span>{label}</span>
        </Label>
      )}
      <Select value={value} onValueChange={setSelectedValue}>
        <SelectTrigger className="bg-white text-xs font-semibold" id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <MapItems
            of={options}
            render={(item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            )}
          />
        </SelectContent>
      </Select>
    </div>
  );
};
