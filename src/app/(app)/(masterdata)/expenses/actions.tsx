'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog, usePermissions } from '@/hooks';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import {
  addExpenseAction,
  editExpenseAction,
  removeExpenseAction,
} from '@/app/lib/actions/expenses';
import { actionResponseToast, checkPermission } from '@/lib/utils';
import ExpenseForm from './ExpenseForm';

export const CreateExpenseDialog = () => {
  const { open, setOpen } = useDialog();
  const { permissions } = usePermissions();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        expense_upper_limit: Number(formData.get('expense_upper_limit')),
        expense_lower_limit: Number(formData.get('expense_lower_limit')),
        expense_detail: formData.get('expense_detail'),
        expense_code: formData.get('expense_code'),
        status: formData.get('status'),
      };

      return addExpenseAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  const canAddExpense =
    checkPermission('add_expenses', permissions) &&
    checkPermission('view_master_data', permissions);

  if (!canAddExpense) {
    return null;
  }

  return (
    <ActionDialogContainer
      title="Tambah Pengeluaran"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Pengeluaran</Button>}
    >
      <ExpenseForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditExpenseDialog = ({
  id,
  upper,
  lower,
  detail,
  code,
  status,
}: {
  id: number;
  upper: number;
  lower: number;
  detail: string;
  code: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        expense_upper_limit: Number(formData.get('expense_upper_limit')),
        expense_lower_limit: Number(formData.get('expense_lower_limit')),
        expense_detail: formData.get('expense_detail'),
        expense_code: formData.get('expense_code'),
        status: formData.get('status'),
      };
      return editExpenseAction(data);
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
      title="Edit Pengeluaran"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <ExpenseForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialUpperLimit={upper}
        initialLowerLimit={lower}
        initialDetail={detail}
        initialCode={code}
        initialStatus={status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteExpenseDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeExpenseAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Biaya?"
      open={open}
      setOpen={setOpen}
      isPending={isPending}
      deleteAction={() => execute({ id })}
      trigger={
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      }
    />
  );
};
