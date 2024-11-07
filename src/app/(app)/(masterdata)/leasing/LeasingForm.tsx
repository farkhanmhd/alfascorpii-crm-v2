'use client';

import React, { useState } from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface LeasingFormProps {
  initialLeasing?: string;
  action: (formData: FormData) => void | string | undefined;
  validationErrors?: {
    leasing?: { _errors?: string[] };
  };
  isPending: boolean;
}

const LeasingForm = ({
  initialLeasing = '',
  action,
  validationErrors = {},
  isPending,
}: LeasingFormProps) => {
  const [leasing, setLeasing] = useState(initialLeasing);

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="leasing"
        label="Nama Leasing"
        value={leasing}
        onChange={(e) => setLeasing(e.target.value)}
        name="leasing"
        error={getErrorMessages(validationErrors.leasing)}
      />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default LeasingForm;
