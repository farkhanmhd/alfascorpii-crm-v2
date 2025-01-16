'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import StatusRadio from '@/components/elements/form/StatusRadio';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface ExpenseFormProps {
  initialUpperLimit?: number;
  initialLowerLimit?: number;
  initialDetail?: string;
  initialCode?: string;
  initialStatus?: 'SHOW' | 'HIDE';
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    expense_upper_limit?: { _errors?: string[] };
    expense_lower_limit?: { _errors?: string[] };
    expense_detail?: { _errors?: string[] };
    expense_code?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
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
        id="expense_upper_limit"
        label="Batas Atas"
        value={upperLimit}
        onChange={(e) => handleNumberChange(e, setUpperLimit)}
        name="expense_upper_limit"
        error={getErrorMessages(validationErrors?.expense_upper_limit)}
        inputMode="numeric"
      />
      <TextInput
        id="expense_lower_limit"
        label="Batas Bawah"
        value={lowerLimit}
        onChange={(e) => handleNumberChange(e, setLowerLimit)}
        name="expense_lower_limit"
        error={getErrorMessages(validationErrors?.expense_lower_limit)}
        inputMode="numeric"
      />
      <TextInput
        id="expense_detail"
        label="Detail"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        name="expense_detail"
        error={getErrorMessages(validationErrors?.expense_detail)}
      />
      <TextInput
        id="expense_code"
        label="Kode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        name="expense_code"
        error={getErrorMessages(validationErrors?.expense_code)}
      />

      <StatusRadio statusValue={status} onValueChange={handleStatusChange} />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default ExpenseForm;
