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
import {
  addExpenseAction,
  editExpenseAction,
  removeExpenseAction,
} from '@/app/lib/actions/expenses';
import { IExpense } from '@/types';
import ExpenseForm from './ExpenseForm';

export const CreateExpenseDialog = () => {
  const { handleClose } = useActionDialog<IExpense>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      expense_upper_limit: Number(formData.get('expense_upper_limit')),
      expense_lower_limit: Number(formData.get('expense_lower_limit')),
      expense_detail: formData.get('expense_detail'),
      expense_code: formData.get('expense_code'),
      status: formData.get('status'),
    };

    return addExpenseAction(data);
  });
  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Tambah Pengeluaran">
      <ExpenseForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditExpenseDialog = () => {
  const { actionDialog, handleClose } = useActionDialog<IExpense>();
  const { execute, result, isPending, reset } = useAction(async (formData) => {
    const data = {
      id: Number(actionDialog?.data?.id),
      expense_upper_limit: Number(formData.get('expense_upper_limit')),
      expense_lower_limit: Number(formData.get('expense_lower_limit')),
      expense_detail: formData.get('expense_detail'),
      expense_code: formData.get('expense_code'),
      status: formData.get('status'),
    };
    return editExpenseAction(data);
  });

  useSubmitToast(result, handleClose, reset);
  return (
    <ActionDialogContainer title="Edit Pengeluaran">
      <ExpenseForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialUpperLimit={Number(actionDialog?.data?.expense_upper_limit)}
        initialLowerLimit={Number(actionDialog?.data?.expense_lower_limit)}
        initialDetail={actionDialog?.data?.expense_detail}
        initialCode={actionDialog?.data?.expense_code}
        initialStatus={actionDialog?.data?.status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteExpenseDialog = () => {
  const { deleteDialog } = useDeleteDialog();
  const { execute, result, isPending, reset } = useAction(removeExpenseAction);

  useDeleteToast(result, reset);

  return (
    <DeleteDialog
      title="Hapus Biaya?"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(deleteDialog?.id) })}
    />
  );
};
