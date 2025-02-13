'use client';

import React, { useState } from 'react';
import TextInput from '@/components/elements/form/TextInput';
import SubmitButton from '@/components/elements/buttons/SubmitButton';
import { getErrorMessages } from '@/lib/utils';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ColorFormProps {
  initialColorName?: string;
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    color_name?: { _errors?: string[] };
  };
  isPending: boolean;
}

const ColorForm = ({
  initialColorName = '',
  action,
  validationErrors = {},
  isPending,
}: ColorFormProps) => {
  const [colorName, setColorName] = useState(initialColorName);

  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="color_name"
        label="Warna"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
        name="color_name"
        error={getErrorMessages(validationErrors.color_name)}
      />
      <div className="flex justify-between">
        <AlertDialogCancel asChild>
          <Button variant="outline" size="icon" className="min-w-max">
            Cancel
          </Button>
        </AlertDialogCancel>
        <SubmitButton className="self-end" disabled={isPending}>
          Submit
        </SubmitButton>
      </div>
    </form>
  );
};

export default ColorForm;
