'use client';

import React, { useState } from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import StatusRadio from '@/components/fragments/form/StatusRadio';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface HobbyFormProps {
  initialHobby?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | string | undefined;
  validationErrors?: {
    hobby_name?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const HobbyForm = ({
  initialHobby = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}: HobbyFormProps) => {
  const [hobby, setHobby] = useState(initialHobby);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="hobby_name"
        label="Hobi"
        value={hobby}
        onChange={(e) => setHobby(e.target.value)}
        name="hobby_name"
        error={getErrorMessages(validationErrors.hobby_name)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default HobbyForm;
