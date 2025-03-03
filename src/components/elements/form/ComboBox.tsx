'use client';

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { useElementWidth } from '@/hooks';
import { ComboBoxOptions } from '@/types';
import MapItems from '@/utils/MapItems';

interface ComboBoxProps {
  options: ComboBoxOptions[];
  label?: string;
  placeholder: string;
  id: string;
  value: string | null | undefined;
  onSelect: (value: string) => void;
  error?: string[];
}

const ComboBox = ({
  options,
  placeholder,
  label,
  id,
  value,
  onSelect,
  error,
}: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  // const { elementRef, elementWidth } = useElementWidth();

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? '' : currentValue;
    onSelect(newValue);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-4">
      {label && (
        <Label htmlFor={id} className="flex gap-x-2 font-semibold">
          <span>{label}</span>
          {error && (
            <span className="text-red-500">
              {error.map((errMsg) => `* ${errMsg}`).join(', ') || '*'}
            </span>
          )}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild id={id}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between text-xs font-semibold"
            id={id}
            // ref={elementRef as React.Ref<HTMLButtonElement>}
          >
            {options.find((option) => option.value === value)?.label ||
              placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          // style={{ width: elementWidth }}
        >
          <Command
            filter={(data, search, keywords) => {
              const extendValue = `${data} ${keywords?.join()}`;
              if (extendValue.toLowerCase().includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="Search option..." />
            <CommandList>
              <ScrollArea>
                <div className="max-h-[300px]">
                  <CommandEmpty>Tidak ada Data</CommandEmpty>
                  <CommandGroup>
                    <MapItems
                      of={options}
                      render={(option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          keywords={[option.label]}
                          onSelect={() => handleSelect(option.value)}
                          className={cn('cursor-pointer hover:bg-accent', {
                            'bg-accent':
                              value === option.value ||
                              (value === '' && option.value === ''),
                          })}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === option.value ||
                                (value === '' && option.value === '')
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      )}
                    />
                  </CommandGroup>
                </div>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboBox;
