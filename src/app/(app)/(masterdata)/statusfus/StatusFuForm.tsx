'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import StatusRadio from '@/components/elements/form/StatusRadio';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';
import { SelectBox } from '@/components/elements/form/Select';
import { SelectOptions } from '@/types';

interface StatusFuFormProps {
  initialDetail?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  methodOptions: SelectOptions[];
  methodId: string;
  setMethodId: React.Dispatch<React.SetStateAction<string>>;
  validationErrors?: {
    detail_fu_name?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const StatusFuForm: React.FC<StatusFuFormProps> = ({
  initialDetail,
  initialStatus = 'SHOW',
  action,
  methodOptions,
  validationErrors = {},
  methodId,
  setMethodId,
  isPending,
}) => {
  const [detail, setDetail] = useState(initialDetail || '');
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };
  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <SelectBox
        options={methodOptions}
        id="fu_method_id"
        placeholder="Pilih Metode Follow Up"
        value={methodId}
        setValue={setMethodId}
      />
      <TextInput
        id="status_fu_name"
        label="Status Follow Up"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        name="status_fu_name"
        error={getErrorMessages(validationErrors.detail_fu_name)}
      />
      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default StatusFuForm;
