'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import StatusRadio from '@/components/elements/form/StatusRadio';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface HouseOwnershipFormProps {
  initialHouseOwnership?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    house_ownership_status?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const HouseOwnershipForm = ({
  initialHouseOwnership = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}: HouseOwnershipFormProps) => {
  const [hobby, setHobby] = useState(initialHouseOwnership);
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="house_ownership_status"
        label="Status Rumah"
        value={hobby}
        onChange={(e) => setHobby(e.target.value)}
        name="house_ownership_status"
        error={getErrorMessages(validationErrors.house_ownership_status)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default HouseOwnershipForm;
