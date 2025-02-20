'use client';

import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useDialog, useStatusFu, usePermissions } from '@/hooks'; // Add usePermissions
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import { SelectOptions } from '@/types';
import { Button } from '@/components/ui/button';
import {
  addDetailFuAction,
  updateDetailFuAction,
  removeDetailFuAction,
} from '@/app/lib/actions/detailfu';
import { actionResponseToast, checkPermission } from '@/lib/utils'; // Add checkPermission
import FuDetailForm from './FuDetailForm';

export const CreateDetailFuDialog = ({
  statuses,
}: {
  statuses: SelectOptions[];
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const { setStatusFus } = useStatusFu();
  const { permissions } = usePermissions(); // Add permissions hook

  useEffect(() => {
    if (statuses) {
      setStatusFus(statuses);
    }
  }, [statuses]);

  const { open, setOpen } = useDialog();
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        status_fu_id: selectedStatus,
        detail_fu_name: formData.get('detail_fu_name'),
        status: formData.get('status'),
      };
      return addDetailFuAction(data);
    },
    {
      onSettled: (actionResult) => {
        actionResponseToast(actionResult);
        setOpen(false);
      },
    }
  );

  const canAddDetail =
    checkPermission('add_follow_up_details', permissions) &&
    checkPermission('view_master_data', permissions);

  if (!canAddDetail) {
    return null;
  }

  return (
    <ActionDialogContainer
      title="Tambah Detail Follow Up"
      trigger={<Button>Tambah Detail</Button>}
      open={open}
      setOpen={setOpen}
    >
      <FuDetailForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        statuses={statuses}
      />
    </ActionDialogContainer>
  );
};

export const EditDetailFuDialog = ({
  detailId,
  statusFuId,
  detail,
  status,
}: {
  detailId: string | number;
  statusFuId: string;
  detail: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const { statusFus } = useStatusFu();
  const [selectedStatus, setSelectedStatus] = useState<string>(statusFuId);
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id: Number(detailId),
        status_fu_id: selectedStatus,
        detail_fu_name: formData.get('detail_fu_name'),
        status: formData.get('status'),
      };
      return updateDetailFuAction(data);
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
      title="Edit Detail Follow Up"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <FuDetailForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialDetail={detail}
        initialStatus={status}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        statuses={statusFus}
      />
    </ActionDialogContainer>
  );
};

export const DeleteDetailFuDialog = ({ id }: { id: string | number }) => {
  const { open, setOpen } = useDialog();
  const { execute, isPending } = useAction(removeDetailFuAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });
  return (
    <DeleteDialog
      title="Hapus Detail Follow Up"
      isPending={isPending}
      deleteAction={() => execute({ id: Number(id) })}
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      }
    />
  );
};
