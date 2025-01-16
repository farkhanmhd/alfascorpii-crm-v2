'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useActionDialog, useSubmitToast, useDeleteToast } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import { IDetailFU } from '@/types';
import {
  addDetailFuAction,
  updateDetailFuAction,
  removeDetailFuAction,
} from '@/app/lib/actions/detailfu';
import FuDetailForm from './FuDetailForm';

export const CreateDetailFuDialog = () => {
  const { handleClose } = useActionDialog<IDetailFU>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      detail_fu_name: formData.get('detail_fu_name'),
      status: formData.get('status'),
    };
    return addDetailFuAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Detail Follow Up">
      <FuDetailForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditDetailFuDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IDetailFU>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      detail_fu_name: formData.get('detail_fu_name'),
      status: formData.get('status'),
    };
    return updateDetailFuAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Detail Follow Up">
      <FuDetailForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialDetail={actionDialog?.data?.detail_fu_name}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteDetailFuDialog = () => {
  const { actionDialog } = useActionDialog<IDetailFU>();
  const { execute, result, isPending, reset } = useAction(removeDetailFuAction);
  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Detail Follow Up"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(actionDialog?.data?.id) })}
    />
  );
};
