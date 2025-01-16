'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import {
  useActionDialog,
  useSubmitToast,
  useDeleteToast,
  useDeleteDialog,
} from '@/hooks';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import {
  addIncomeAction,
  editIncomeAction,
  removeIncomeAction,
} from '@/app/lib/actions/incomes';
import { IIncome } from '@/types';
import IncomeForm from './IncomeForm';

export const CreateIncomeDialog = () => {
  const { handleClose } = useActionDialog<IIncome>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      income_upper_limit: Number(formData.get('income_upper_limit')),
      income_lower_limit: Number(formData.get('income_lower_limit')),
      income_detail: formData.get('income_detail'),
      income_code: formData.get('income_code'),
      status: formData.get('status'),
    };
    return addIncomeAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Pendapatan">
      <IncomeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditIncomeDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IIncome>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      income_upper_limit: Number(formData.get('income_upper_limit')),
      income_lower_limit: Number(formData.get('income_lower_limit')),
      income_detail: formData.get('income_detail'),
      income_code: formData.get('income_code'),
      status: formData.get('status'),
    };
    return editIncomeAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Pendapatan">
      <IncomeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialUpperLimit={Number(actionDialog?.data?.income_upper_limit)}
        initialLowerLimit={Number(actionDialog?.data?.income_lower_limit)}
        initialDetail={actionDialog?.data?.income_detail}
        initialCode={actionDialog?.data?.income_code}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteIncomeDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, result, isPending, reset } = useAction(removeIncomeAction);

  useDeleteToast(result, reset);

  return (
    <DeleteDialog
      title="Hapus Biaya?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
