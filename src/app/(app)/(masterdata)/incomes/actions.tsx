'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import {
  addIncomeAction,
  editIncomeAction,
  removeIncomeAction,
} from '@/app/lib/actions/incomes';
import { actionResponseToast } from '@/lib/utils';
import IncomeForm from './IncomeForm';

export const CreateIncomeDialog = () => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        income_upper_limit: Number(formData.get('income_upper_limit')),
        income_lower_limit: Number(formData.get('income_lower_limit')),
        income_detail: formData.get('income_detail'),
        income_code: formData.get('income_code'),
        status: formData.get('status'),
      };
      return addIncomeAction(data);
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
      title="Tambah Pendapatan"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Pendapatan</Button>}
    >
      <IncomeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditIncomeDialog = ({
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
        income_upper_limit: Number(formData.get('income_upper_limit')),
        income_lower_limit: Number(formData.get('income_lower_limit')),
        income_detail: formData.get('income_detail'),
        income_code: formData.get('income_code'),
        status: formData.get('status'),
      };
      return editIncomeAction(data);
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
      title="Edit Pendapatan"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <IncomeForm
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

export const DeleteIncomeDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute: deleteJob, isPending } = useAction(removeIncomeAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });
  return (
    <DeleteDialog
      title="Hapus Pendapatan?"
      isPending={isPending}
      deleteAction={() => deleteJob({ id })}
      open={open}
      setOpen={setOpen}
      trigger={
        <Button size="icon" variant="outline">
          <Trash />
        </Button>
      }
    />
  );
};
