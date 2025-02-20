'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';

interface ServiceTypeFormProps {
  initialServiceType?: string;
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    service_name?: { _errors?: string[] };
    status?: { _errors?: string[] };
  };
  isPending: boolean;
}

const ServiceTypeForm = ({
  initialServiceType = '',
  action,
  validationErrors = {},
  isPending,
}: ServiceTypeFormProps) => {
  const [serviceType, setServiceType] = useState(initialServiceType);

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="service_name"
        label="Tipe Service"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        name="service_name"
        error={getErrorMessages(validationErrors.service_name)}
      />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default ServiceTypeForm;
