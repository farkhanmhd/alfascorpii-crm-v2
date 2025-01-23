'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useDialog } from '@/hooks';
import {
  addDegreeAction,
  updateDegreeAction,
  removeDegreeAction,
} from '@/app/lib/actions/degree';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import { actionResponseToast } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import DegreeForm from './DegreeForm';

export const CreateDegreeDialog = () => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        degree: formData.get('degree'),
        code: formData.get('code'),
        status: formData.get('status'),
      };
      return addDegreeAction(data);
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
      title="Tambah Pendidikan"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Pendidikan</Button>}
    >
      <DegreeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditDegreeDialog = ({
  id,
  degree,
  code,
  status,
}: {
  id: number;
  degree: string;
  code: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        degree: formData.get('degree'),
        code: formData.get('code'),
        status: formData.get('status'),
      };
      return updateDegreeAction(data);
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
      title="Edit Pendidikan"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button size="icon" variant="outline">
          <Pencil />
        </Button>
      }
    >
      <DegreeForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialDegree={degree}
        initialCode={code}
        initialStatus={status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteDegreeDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeDegreeAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });
  return (
    <DeleteDialog
      title="Hapus Pendidikan"
      deleteAction={() => execute({ id })}
      isPending={isPending}
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
