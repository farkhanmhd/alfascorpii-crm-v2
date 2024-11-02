'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import { IDegree } from '@/types';
import {
  addDegreeAction,
  updateDegreeAction,
  removeDegreeAction,
} from '@/app/lib/actions/degree';
import ActionDialogContainer from '@/components/fragments/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/fragments/dialogs/DeleteDialog';
import DegreeForm from './DegreeForm';

export const CreateDegreeDialog = () => {
  const { handleClose } = useActionDialog<IDegree>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      degree: formData.get('degree'),
      code: formData.get('code'),
      status: formData.get('status'),
    };
    return addDegreeAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Pendidikan">
      <DegreeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditDegreeDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IDegree>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      degree: formData.get('degree'),
      code: formData.get('code'),
      status: formData.get('status'),
    };
    return updateDegreeAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Pendidikan">
      <DegreeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialDegree={actionDialog?.data?.degree_name}
        initialCode={actionDialog?.data?.degree_code}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteDegreeDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, result, isPending, reset } = useAction(removeDegreeAction);
  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Pendidikan"
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
      isPending={isPending}
    />
  );
};
