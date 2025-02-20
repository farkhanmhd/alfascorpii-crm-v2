'use client';

import React from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import { useDialog, usePermissions } from '@/hooks';
import {
  addDealerAction,
  editDealerAction,
  removeDealerAction,
} from '@/app/lib/actions/dealers';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import { actionResponseToast, checkPermission } from '@/lib/utils';
import { Pencil, Trash } from 'lucide-react';
import DealerForm from './DealerForm';

export const CreateDealerDialog = () => {
  const { open, setOpen } = useDialog();
  const { permissions } = usePermissions();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        dealer_code: formData.get('dealer_code'),
        dealer_name: formData.get('dealer_name'),
        dealer_area: formData.get('dealer_area'),
        dealer_type: formData.get('dealer_type'),
      };
      return addDealerAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  const canAddDealer =
    checkPermission('add_dealers', permissions) &&
    checkPermission('view_master_data', permissions);

  if (!canAddDealer) {
    return null;
  }

  return (
    <ActionDialogContainer
      title="Tambah Dealer"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Dealer</Button>}
    >
      <DealerForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
      />
    </ActionDialogContainer>
  );
};
export const EditDealerDialog = ({
  id,
  dealerCode,
  dealerName,
  dealerArea,
  dealerType,
}: {
  id: number;
  dealerCode: string;
  dealerName: string;
  dealerArea: string;
  dealerType: string;
}) => {
  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        dealer_code: formData.get('dealer_code'),
        dealer_name: formData.get('dealer_name'),
        dealer_area: formData.get('dealer_area'),
        dealer_type: formData.get('dealer_type'),
      };
      return editDealerAction(data);
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
      title="Edit Dealer"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button size="icon" variant="outline">
          <Pencil />
        </Button>
      }
    >
      <DealerForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialCode={dealerCode}
        initialName={dealerName}
        initialArea={dealerArea}
        initialType={dealerType}
      />
    </ActionDialogContainer>
  );
};

export const DeleteDealerDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeDealerAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });
  return (
    <DeleteDialog
      title="Hapus Dealer"
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
