'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import { addUser } from '@/app/lib/actions/staff';
import { actionResponseToast } from '@/lib/utils';
import AddStaffForm from './add-staff-form';

export const AddStaffDialog = () => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        username: formData.get('username'),
        name: formData.get('name'),
      };

      return addUser(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  return (
    <ActionDialogContainer
      title="Tambah Staff"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Staff</Button>}
    >
      <AddStaffForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};
