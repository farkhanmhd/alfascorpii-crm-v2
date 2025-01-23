import SubmitButton from '@/components/elements/buttons/SubmitButton';
import TextInput from '@/components/elements/form/TextInput';
import React from 'react';

type Props = {
  action: (formData: FormData) => void | Promise<void> | undefined;
  validationErrors?: {
    username?: { _errors?: string[] };
    name?: { _errors?: string[] };
  };
  isPending: boolean;
};

const AddStaffForm = ({ action, validationErrors, isPending }: Props) => {
  return (
    <form className="flex flex-col gap-y-8" action={action}>
      <TextInput
        id="username"
        label="Username"
        name="username"
        error={validationErrors?.username?._errors}
        placeholder="Username"
      />
      <TextInput
        id="name"
        label="Name"
        name="name"
        error={validationErrors?.name?._errors}
        placeholder="Name"
      />
      <SubmitButton className="self-end" disabled={isPending}>
        Submit
      </SubmitButton>
    </form>
  );
};

export default AddStaffForm;
