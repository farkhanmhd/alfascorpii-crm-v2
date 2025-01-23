'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import StatusRadio from '@/components/elements/form/StatusRadio';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';
import SelectStatusFu from '@/components/fragments/SelectStatusFu';
import { SelectOptions } from '@/types';

interface FuResultFormProps {
  initialResult?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    method?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
  statuses: SelectOptions[];
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
}

const FuResultForm = ({
  initialResult = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
  statuses = [],
  selectedStatus,
  setSelectedStatus,
}: FuResultFormProps) => {
  const [result, setResult] = useState(initialResult);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <SelectStatusFu
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        statuses={statuses}
      />
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
