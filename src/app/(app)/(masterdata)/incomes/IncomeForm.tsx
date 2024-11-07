'use client';

import React, { useState } from 'react';
import TextInput from '@/components/fragments/form/TextInput';
import StatusRadio from '@/components/fragments/form/StatusRadio';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface IncomeFormProps {
  initialUpperLimit?: number;
  initialLowerLimit?: number;
  initialDetail?: string;
  initialCode?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | string | undefined;
  validationErrors?: {
    income_upper_limit?: { _errors?: string[] };
    income_lower_limit?: { _errors?: string[] };
    income_detail?: { _errors?: string[] };
    income_code?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const IncomeForm: React.FC<IncomeFormProps> = ({
  initialUpperLimit = 0,
  initialLowerLimit = 0,
  initialDetail = '',
  initialCode = '',
  initialStatus = 'SHOW',
  action,
  validationErrors = {},
  isPending,
}) => {
  const [upperLimit, setUpperLimit] = useState<number>(
    Number(initialUpperLimit)
  );
  const [lowerLimit, setLowerLimit] = useState<number>(
    Number(initialLowerLimit)
  );
  const [detail, setDetail] = useState(initialDetail);
  const [code, setCode] = useState(initialCode);
  const [status, setStatus] = useState(initialStatus);

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setter(Number(value));
  };

  const handleStatusChange = (value: 'SHOW' | 'HIDE') => {
    setStatus(value);
  };

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="income_upper_limit"
        label="Batas Atas"
        value={upperLimit}
        onChange={(e) => handleNumberChange(e, setUpperLimit)}
        name="income_upper_limit"
        error={getErrorMessages(validationErrors?.income_upper_limit)}
        inputMode="numeric"
      />
      <TextInput
        id="income_lower_limit"
        label="Batas Bawah"
        value={lowerLimit}
        onChange={(e) => handleNumberChange(e, setLowerLimit)}
        name="income_lower_limit"
        error={getErrorMessages(validationErrors?.income_lower_limit)}
        inputMode="numeric"
      />
      <TextInput
        id="income_detail"
        label="Detail"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        name="income_detail"
        error={getErrorMessages(validationErrors?.income_detail)}
      />
      <TextInput
        id="income_code"
        label="Kode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        name="income_code"
        error={getErrorMessages(validationErrors?.income_code)}
      />

      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default IncomeForm;
