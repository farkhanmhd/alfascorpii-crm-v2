'use client';

import React, { useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog, useStatusFu, usePermissions } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addFuResultAction,
  editFuResultAction,
  removeFuResultAction,
} from '@/app/lib/actions/furesult';
import { SelectOptions } from '@/types';
import { actionResponseToast, checkPermission } from '@/lib/utils';
import FuResultForm from './FuResultForm';

export const CreateFuResultDialog = ({
  statusFuOptions,
}: {
  statusFuOptions: SelectOptions[];
}) => {
  const { permissions } = usePermissions();
  const { open, setOpen } = useDialog();
  const { setStatusFus } = useStatusFu();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
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

  const canAddResult =
    checkPermission('add_follow_up_results', permissions) &&
    checkPermission('view_follow_up_results', permissions);

  if (!canAddResult) {
    return null;
  }

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
      />
    </ActionDialogContainer>
  );
};

export const EditFuResultDialog = ({
  id,
  status,
  furesult,
}: {
  id: string;
  status: 'SHOW' | 'HIDE';
  furesult: string;
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id: String(id),
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
