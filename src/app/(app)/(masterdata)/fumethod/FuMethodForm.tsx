'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import StatusRadio from '@/components/elements/form/StatusRadio';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface FuMethodFormProps {
  initialMethod?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    method?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const FuMethodForm = ({
  initialMethod = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}: FuMethodFormProps) => {
  const [method, setMethod] = useState(initialMethod);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="fu_method_name"
        label="Metode follow-up"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        name="fu_method_name"
        error={getErrorMessages(validationErrors.method)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default FuMethodForm;
