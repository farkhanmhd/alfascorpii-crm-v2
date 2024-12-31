'use client';

import React from 'react';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
  id: string;
  label: string;
  placeholder: string;
  error?: string[];
}

export const SelectBox = ({
  options,
  label,
  error,
  id,
  placeholder,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      {label && (
        <Label htmlFor={id} className="flex gap-x-2">
          <span>{label}</span>
          {error && (
            <span className="text-red-500">
              {error.map((errMsg) => `* ${errMsg}`).join(', ') || '*'}
            </span>
          )}
        </Label>
      )}
      <Select>
        <SelectTrigger className="w-full" id={id}>
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
        <SelectTrigger
          className="w-full bg-white text-xs font-semibold"
          id={id}
        >
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
