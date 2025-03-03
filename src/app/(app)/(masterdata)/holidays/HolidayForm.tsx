'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import StatusRadio from '@/components/elements/form/StatusRadio';
import DatePicker from '@/components/elements/form/DatePicker';
import { getErrorMessages } from '@/lib/utils';

interface HolidayFormProps {
  initialHoliday?: string;
  initialMessage?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  date?: Date;
  setDate: (date: Date) => void;
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    holiday?: { _errors?: string[] };
    message?: { _errors?: string[] };
    date?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const HolidayForm: React.FC<HolidayFormProps> = ({
  initialHoliday = '',
  initialMessage = '',
  initialStatus = 'SHOW',
  date = new Date(),
  setDate,
  action,
  validationErrors = {},
  isPending,
}: HolidayFormProps) => {
  const [holiday, setHoliday] = useState(initialHoliday);
  const [message, setMessage] = useState(initialMessage);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="holiday"
        name="holiday"
        label="Hari Besar"
        value={holiday}
        onChange={(e) => setHoliday(e.target.value)}
        error={getErrorMessages(validationErrors.holiday)}
      />
      <TextInput
        id="message"
        name="message"
        label="Ucapan"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        error={getErrorMessages(validationErrors.message)}
      />
      <DatePicker id="date" date={date} setDate={setDate} />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton disabled={isPending}>Submit</SubmitButton>
    </form>
  );
};

export default HolidayForm;
