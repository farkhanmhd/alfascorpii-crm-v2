'use client';

import React, { useState } from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import StatusRadio from '@/components/fragments/form/StatusRadio';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface CustomerJobFormProps {
  initialJob?: string;
  initialCode?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    job?: { _errors?: string[] };
    code?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const CustomerJobForm = ({
  initialJob = '',
  initialCode = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}: CustomerJobFormProps) => {
  const [job, setJob] = useState(initialJob);
  const [code, setCode] = useState(initialCode);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="job"
        label="Pekerjaan"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        name="job"
        error={getErrorMessages(validationErrors.job)}
      />
      <TextInput
        id="code"
        label="Kode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        name="code"
        error={getErrorMessages(validationErrors.code)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default CustomerJobForm;
