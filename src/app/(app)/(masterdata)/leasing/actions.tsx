'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import { ILeasing } from '@/types';
import {
  addLeasingAction,
  updateLeasingAction,
  removeLeasingAction,
} from '@/app/lib/actions/leasing';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import LeasingForm from './LeasingForm';

export const CreateLeasingDialog = () => {
  const { handleClose } = useActionDialog<ILeasing>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      leasing: formData.get('leasing'),
    };

    return addLeasingAction(data);
  });

  useSubmitToast(result, handleClose, reset);

  return (
    <ActionDialogContainer title="Tambah Leasing">
      <LeasingForm
        action={execute}
        isPending={isPending}
        validationErrors={result?.validationErrors}
      />
    </ActionDialogContainer>
  );
};

export const EditLeasingDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<ILeasing>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      leasing: formData.get('leasing'),
    };

    return updateLeasingAction(data);
  });

  useSubmitToast(result, handleClose, reset);

  return (
    <ActionDialogContainer title="Update Leasing">
      <LeasingForm
        action={execute}
        initialLeasing={actionDialog?.data?.leasing_name}
        isPending={isPending}
        validationErrors={result?.validationErrors}
      />
    </ActionDialogContainer>
  );
};

export const DeleteLeasingDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const {
    execute: deleteLeasing,
    isPending,
    result,
    reset,
  } = useAction(removeLeasingAction);

  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Leasing?"
      isPending={isPending}
      deleteAction={() => deleteLeasing({ id: Number(deleteDialog?.id) })}
    />
  );
};
