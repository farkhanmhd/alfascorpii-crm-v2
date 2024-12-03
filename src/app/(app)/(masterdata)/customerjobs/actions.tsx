'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import ActionDialogContainer from '@/components/fragments/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/fragments/dialogs/DeleteDialog';
import { addJob, updateJob, removeJob } from '@/app/lib/actions/customerjobs';
import { ICustomerJob } from '@/types';
import CustomerJobForm from './CustomerJobForm';

export const CreateCustomerJobDialog = () => {
  const { handleClose } = useActionDialog();

  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      job: formData.get('job'),
      code: formData.get('code'),
      status: formData.get('status'),
    };
    return addJob(data);
  });

  useSubmitToast(result, handleClose, reset);

  return (
    <ActionDialogContainer title="Tambah Pekerjaan">
      <CustomerJobForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditCustomerJobDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<ICustomerJob>();

  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      job: formData.get('job'),
      code: formData.get('code'),
      status: formData.get('status'),
    };
    return updateJob(data);
  });

  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Pekerjaan">
      <CustomerJobForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialJob={actionDialog?.data?.job_name}
        initialCode={actionDialog?.data?.job_code}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteJobDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const {
    execute: deleteLeasing,
    isPending,
    result,
    reset,
  } = useAction(removeJob);

  useDeleteToast(result, reset);
  return (
    <DeleteDialog
      title="Hapus Pekerjaan?"
      isPending={isPending}
      deleteAction={() => deleteLeasing({ id: Number(deleteDialog?.id) })}
    />
  );
};
