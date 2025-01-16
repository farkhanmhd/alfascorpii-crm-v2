'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface LeasingFormProps {
  initialProduct?: string;
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    product_name?: { _errors?: string[] };
  };
  isPending: boolean;
}

const LeasingForm = ({
  initialProduct = '',
  action,
  validationErrors = {},
  isPending,
}: LeasingFormProps) => {
  const [product, setProduct] = useState(initialProduct);

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="product_name"
        label="Nama Sepeda Motor"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        name="product_name"
        error={getErrorMessages(validationErrors.product_name)}
      />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default LeasingForm;
