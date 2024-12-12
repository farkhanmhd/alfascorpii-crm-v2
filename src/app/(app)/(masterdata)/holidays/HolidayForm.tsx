'use client';

import React, { useState } from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import StatusRadio from '@/components/fragments/form/StatusRadio';
import DatePicker from '@/components/fragments/form/DatePicker';
import { getErrorMessages } from '@/lib/utils';

interface HolidayFormProps {
  initialHoliday?: string;
  initialMessage?: string;
  initialStatus?: 'SHOW' | 'HIDE';
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
      <DatePicker id="date" />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton disabled={isPending}>Submit</SubmitButton>
    </form>
  );
};

export default HolidayForm;
