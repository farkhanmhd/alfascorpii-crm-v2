'use client';

import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { useSelectedDate } from '@/hooks';
import { SelectSingleEventHandler } from 'react-day-picker';

interface DatePickerProps {
  error?: string[];
  onChange: SelectSingleEventHandler | undefined;
}

const DatePicker = ({ error, onChange }: DatePickerProps) => {
  const { selectedDate } = useSelectedDate();

  return (
    <div className="flex flex-col gap-y-4">
      <Label htmlFor="date">
        <span>Tanggal</span>
        {error && (
          <span className="text-red-500">
            {error.map((errMsg) => ` * ${errMsg}`).join(', ') || ' *'}
          </span>
        )}
      </Label>
      <Popover>
        <PopoverTrigger asChild id="date">
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {selectedDate ? (
              format(selectedDate, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate as Date}
            onSelect={onChange}
            initialFocus
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
