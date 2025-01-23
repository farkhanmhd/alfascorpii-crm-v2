'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addRelationAction,
  editRelationAction,
  removeRelationAction,
} from '@/app/lib/actions/relation';
import { actionResponseToast } from '@/lib/utils';
import RelationForm from './RelationForm';

export const CreateRelationDialog = () => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        relation: formData.get('relation'),
        status: formData.get('status'),
      };
      return addRelationAction(data);
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
      title="Tambah Kerabat"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Pekerjaan</Button>}
    >
      <RelationForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditRelationDialog = ({
  id,
  relation,
  status,
}: {
  id: number;
  relation: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        relation: formData.get('relation'),
        status: formData.get('status'),
      };
      return editRelationAction(data);
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
      title="Edit Kerabat"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <RelationForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialRelation={relation}
        initialStatus={status}
      />
    </ActionDialogContainer>
  );
};

export const DeleteRelationDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeRelationAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Pekerjaan?"
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
