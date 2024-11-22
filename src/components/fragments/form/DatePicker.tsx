// 'use client';

// import React from 'react';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon } from 'lucide-react';

// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { Label } from '@/components/ui/label';
// import { useSelectedDate } from '@/hooks';
// import { SelectSingleEventHandler } from 'react-day-picker';

// interface DatePickerProps {
//   label?: string;
//   error?: string[];
//   placeholder?: string;
//   onChange: SelectSingleEventHandler | undefined;
// }

// const DatePicker = ({
//   label,
//   error,
//   placeholder = 'Pick a date',
//   onChange,
// }: DatePickerProps) => {
//   const { selectedDate } = useSelectedDate();

//   return (
//     <div className="flex flex-col gap-y-4">
//       {label && (
//         <Label htmlFor="date">
//           <span>Tanggal</span>
//           {error && (
//             <span className="text-red-500">
//               {error.map((errMsg) => ` * ${errMsg}`).join(', ') || ' *'}
//             </span>
//           )}
//         </Label>
//       )}
//       <Popover>
//         <PopoverTrigger asChild id="date">
//           <Button
//             variant="outline"
//             className={cn(
//               'justify-start text-left font-normal',
//               !selectedDate && 'text-muted-foreground'
//             )}
//           >
//             <CalendarIcon />
//             {selectedDate ? (
//               format(selectedDate, 'PPP')
//             ) : (
//               <span>{placeholder}</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <Calendar
//             mode="single"
//             selected={selectedDate as Date}
//             onSelect={onChange}
//             initialFocus
//             className="w-full"
//             captionLayout="dropdown"
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default DatePicker;

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
  id: string;
  label?: string;
  startYear?: number;
  endYear?: number;
}
const DatePicker = ({
  id,
  label = 'Date',
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date>(new Date());

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
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild id={id} name={id}>
          <Button
            variant="outline"
            className={cn(
              'max-w-max justify-start text-left font-normal',
              !date && 'text-muted-foreground'
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
              <SelectTrigger>
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
              <SelectTrigger>
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
