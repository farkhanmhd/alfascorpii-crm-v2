'use client';

import React, { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog, useStatusFu } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addFuResultAction,
  editFuResultAction,
  removeFuResultAction,
} from '@/app/lib/actions/furesult';
import { SelectOptions } from '@/types';
import { actionResponseToast } from '@/lib/utils';
import FuResultForm from './FuResultForm';

export const CreateFuResultDialog = ({
  statusFuOptions,
}: {
  statusFuOptions: SelectOptions[];
}) => {
  const { open, setOpen } = useDialog();
  const [selectedStatus, setSelectedStatus] = useState<string>(
    statusFuOptions[0].value
  );
  const { setStatusFus } = useStatusFu();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        status_fu_id: selectedStatus,
        fu_result_name: formData.get('fu_result_name'),
        status: formData.get('status'),
      };
      return addFuResultAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  useEffect(() => {
    if (statusFuOptions) {
      setStatusFus(statusFuOptions);
    }
  }, [statusFuOptions]);

  return (
    <ActionDialogContainer
      title="Tambah Hasil Follow Up"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Metode Follow Up</Button>}
    >
      <FuResultForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        statuses={statusFuOptions}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </ActionDialogContainer>
  );
};

export const EditFuResultDialog = ({
  id,
  status,
  furesult,
}: {
  id: number;
  status: 'SHOW' | 'HIDE';
  furesult: string;
}) => {
  const { statusFus } = useStatusFu();
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        status_fu_id: selectedStatus,
        fu_result_name: formData.get('fu_result_name'),
        status: formData.get('status'),
      };
      return editFuResultAction(data);
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
      title="Edit Hasil Follow Up"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <FuResultForm
        action={execute}
        validationErrors={result?.validationErrors}
        initialStatus={status}
        initialResult={furesult}
        isPending={isPending}
        statuses={statusFus}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </ActionDialogContainer>
  );
};

export const DeleteFuResultDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeFuResultAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Hasil Follow Up?"
      isPending={isPending}
      deleteAction={() => execute({ id })}
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
