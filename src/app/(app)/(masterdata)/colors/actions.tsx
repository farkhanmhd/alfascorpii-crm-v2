'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import { addColor, updateColor, removeColor } from '@/app/lib/actions/colors';
import { actionResponseToast } from '@/lib/utils';

import ColorForm from './ColorForm';

export const CreateColorDialog = () => {
  const { open, setOpen } = useDialog();

  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        color_name: formData.get('color_name'),
      };
      return addColor(data);
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
      title="Tambah Warna"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Warna</Button>}
    >
      <ColorForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditColorDialog = ({
  id,
  color_name,
}: {
  id: number;
  color_name: string;
}) => {
  const { open, setOpen } = useDialog();

  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        color_name: formData.get('color_name'),
      };
      return updateColor(data);
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
      title="Edit Warna"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <ColorForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialColorName={color_name}
      />
    </ActionDialogContainer>
  );
};

export const DeleteColorDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute: deleteColor, isPending } = useAction(removeColor, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Warna?"
      isPending={isPending}
      deleteAction={() => deleteColor({ id })}
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
