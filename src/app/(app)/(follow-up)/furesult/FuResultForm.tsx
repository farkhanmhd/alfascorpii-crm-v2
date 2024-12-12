'use client';

import React, { useState } from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import StatusRadio from '@/components/fragments/form/StatusRadio';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface FuResultFormProps {
  initialResult?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    method?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const FuResultForm = ({
  initialResult = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}: FuResultFormProps) => {
  const [result, setResult] = useState(initialResult);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="fu_result_name"
        label="Hasil follow-up"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        name="fu_result_name"
        error={getErrorMessages(validationErrors.method)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default FuResultForm;
