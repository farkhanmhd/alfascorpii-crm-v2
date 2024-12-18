'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import DeleteDialog from '@/components/fragments/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/fragments/dialogs/ActionDialogContainer';
import { IResultFU } from '@/types';
import {
  addFuResultAction,
  editFuResultAction,
  removeFuResultAction,
} from '@/app/lib/actions/furesult';
import FuResultForm from './FuResultForm';

export const CreateFuResultDialog = () => {
  const { handleClose } = useActionDialog<IResultFU>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      fu_result_name: formData.get('fu_result_name'),
      status: formData.get('status'),
    };
    return addFuResultAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Hasil Follow Up">
      <FuResultForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditFuResultDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IResultFU>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      fu_result_name: formData.get('fu_result_name'),
      status: formData.get('status'),
    };
    return editFuResultAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Hasil Follow Up">
      <FuResultForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialResult={actionDialog?.data?.fu_result_name}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteFuResultDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, result, isPending, reset } = useAction(removeFuResultAction);
  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Hasil Follow Up?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
