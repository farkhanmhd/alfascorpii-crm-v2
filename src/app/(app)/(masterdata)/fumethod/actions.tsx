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
import { IFUMethod } from '@/types';
import {
  addFuMethodAction,
  editFuMethodAction,
  removeFuMethodAction,
} from '@/app/lib/actions/fumethod';
import FuMethodForm from './FuMethodForm';

export const CreateFuMethodDialog = () => {
  const { handleClose } = useActionDialog<IFUMethod>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      fu_method_name: formData.get('fu_method_name'),
      status: formData.get('status'),
    };
    return addFuMethodAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Metode Follow Up">
      <FuMethodForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditFuMethodDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IFUMethod>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      fu_method_name: formData.get('fu_method_name'),
      status: formData.get('status'),
    };
    return editFuMethodAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Metode Follow Up">
      <FuMethodForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialMethod={actionDialog?.data?.fu_method_name}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteFuMethodDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, result, isPending, reset } = useAction(removeFuMethodAction);
  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Metode Follow Up?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
