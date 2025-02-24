'use client';

import * as React from 'react';
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DatePickerProps {
  id?: string;
  label?: string;
  startYear?: number;
  endYear?: number;
  className?: string;
  date?: Date;
  setDate?: (date: Date) => void;
  hideLabel?: boolean;
  error?: string[];
}
const DatePicker = ({
  id,
  label,
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  className,
  date = new Date(),
  setDate = () => {},
  hideLabel,
  error,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, Number(year));
    setDate(newDate);
  };

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      setDate(selectedData);
      setOpen(false); // auto-close the popover on selection
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {label && (
        <Label
          htmlFor={id}
          className={cn('flex gap-x-2 font-semibold', {
            'sr-only': hideLabel,
          })}
        >
          <span>{label}</span>
          {error && (
            <span className="text-red-500">
              {error.map((errMsg) => `* ${errMsg}`).join(', ') || '*'}
            </span>
          )}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild id={id} name={id}>
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left text-xs font-semibold',
              !date && 'text-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex justify-between gap-x-2 p-2">
            <Select
              onValueChange={handleMonthChange}
              value={months[getMonth(date)]}
            >
              <SelectTrigger className="pointer-events-auto">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleYearChange}
              value={getYear(date).toString()}
            >
              <SelectTrigger className="pointer-events-auto">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            month={date}
            onMonthChange={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
