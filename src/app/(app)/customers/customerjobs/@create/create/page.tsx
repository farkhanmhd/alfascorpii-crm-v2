'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useSubmitToast } from '@/hooks';
import DialogContainer from '@/components/fragments/dialogs/DialogContainer';
import CustomerJobForm from '../../CustomerJobForm';
import { addNewPekerjaan } from '@/app/lib/actions/customers/pekerjaan';

const CreatePage = () => {
  const { back } = useRouter();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      job: formData.get('job'),
      code: formData.get('code'),
      status: formData.get('status'),
    };
    return addNewPekerjaan(data);
  });

  useSubmitToast(result, back, reset);

  return (
    <DialogContainer title="Tambah Pekerjaan">
      <CustomerJobForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </DialogContainer>
  );
};

export default CreatePage;
