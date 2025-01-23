'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  addMotorcycleAction,
  updateMotorcycleAction,
  deleteMotorcycleAction,
} from '@/app/lib/actions/motorcycles';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import { useDialog } from '@/hooks';
import { actionResponseToast } from '@/lib/utils';
import ProductPreferencesForm from './ProductPreferencesForm';

export const CreateProductDialog = () => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        product_name: formData.get('product_name'),
      };

      return addMotorcycleAction(data);
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
      title="Tambah Sepeda Motor"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Pekerjaan</Button>}
    >
      <ProductPreferencesForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};

export const EditProductDialog = ({
  id,
  product,
}: {
  id: number;
  product: string;
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        product_name: formData.get('product_name'),
      };
      return updateMotorcycleAction(data);
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
      title="Edit Sepeda Motor"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <ProductPreferencesForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialProduct={product}
      />
    </ActionDialogContainer>
  );
};

export const DeleteProductDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(deleteMotorcycleAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });
  return (
    <DeleteDialog
      title="Hapus Sepeda Motor?"
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
