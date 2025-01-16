'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import StatusRadio from '@/components/elements/form/StatusRadio';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface RelationFormProps {
  initialRelation?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    relation?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const RelationForm = ({
  initialRelation = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}: RelationFormProps) => {
  const [relation, setRelation] = useState(initialRelation);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="relation"
        label="Kerabat"
        value={relation}
        onChange={(e) => setRelation(e.target.value)}
        name="relation"
        error={getErrorMessages(validationErrors.relation)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default RelationForm;
