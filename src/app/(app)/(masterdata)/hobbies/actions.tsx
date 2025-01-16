'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import { IHobby } from '@/types';
import {
  addHobbyAction,
  updateHobbyAction,
  deleteHobbyAction,
} from '@/app/lib/actions/hobbies';
import HobbyForm from './HobbyForm';

export const CreateHobbyDialog = () => {
  const { handleClose } = useActionDialog<IHobby>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      hobby_name: formData.get('hobby_name'),
      status: formData.get('status'),
    };
    return addHobbyAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Hobi">
      <HobbyForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditHobbyDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IHobby>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      hobby_name: formData.get('hobby_name'),
      status: formData.get('status'),
    };
    return updateHobbyAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Hobi">
      <HobbyForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialHobby={actionDialog?.data?.hobby_name}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteHobbyDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, isPending, result, reset } = useAction(deleteHobbyAction);

  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Hobi?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
