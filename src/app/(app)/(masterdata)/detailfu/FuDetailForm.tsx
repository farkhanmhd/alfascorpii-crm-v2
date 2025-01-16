'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import StatusRadio from '@/components/elements/form/StatusRadio';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface FuDetailFormProps {
  initialDetail?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    detail_fu_name?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const FuDetailForm: React.FC<FuDetailFormProps> = ({
  initialDetail = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}) => {
  const [detail, setDetail] = useState(initialDetail);
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };
  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="detail_fu_name"
        label="Detail Follow Up"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        name="detail_fu_name"
        error={getErrorMessages(validationErrors.detail_fu_name)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default FuDetailForm;
