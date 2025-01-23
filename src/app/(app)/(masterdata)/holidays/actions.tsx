'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useDialog } from '@/hooks';
import DeleteDialog from '@/components/elements/dialogs/DeleteDialog';
import ActionDialogContainer from '@/components/elements/dialogs/ActionDialogContainer';
import {
  addHolidayAction,
  editHolidayAction,
  removeHolidayAction,
} from '@/app/lib/actions/holiday';
import { actionResponseToast } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Pencil, Trash } from 'lucide-react';
import HolidayForm from './HolidayForm';

export const CreateHolidayDialog = () => {
  const { open, setOpen } = useDialog();
  const [date, setDate] = useState<Date>(new Date());
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        holiday: formData.get('holiday'),
        message: formData.get('message'),
        date: format(date, 'yyyy-MM-dd'),
        status: formData.get('status'),
      };

      return addHolidayAction(data);
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
      title="Tambah Hari Besar"
      open={open}
      setOpen={setOpen}
      trigger={<Button>Tambah Hari Besar</Button>}
    >
      <HolidayForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        date={date}
        setDate={setDate}
      />
    </ActionDialogContainer>
  );
};

export const EditHolidayDialog = ({
  id,
  holiday,
  message,
  date,
  status,
}: {
  id: number;
  holiday: string;
  message: string;
  date: string;
  status: 'SHOW' | 'HIDE';
}) => {
  const { open, setOpen } = useDialog();
  const [dateValue, setDateValue] = useState<Date>(
    date ? new Date(date) : new Date()
  );
  const { execute, result, isPending } = useAction(
    async (formData) => {
      const data = {
        id,
        holiday: formData.get('holiday'),
        message: formData.get('message'),
        date: format(dateValue, 'yyyy-MM-dd'),
        status: formData.get('status'),
      };

      return editHolidayAction(data);
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
      title="Tambah Hari Besar"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      }
    >
      <HolidayForm
        action={execute}
        validationErrors={result?.validationErrors}
        isPending={isPending}
        initialHoliday={holiday}
        initialMessage={message}
        initialStatus={status}
        date={dateValue}
        setDate={setDateValue}
      />
    </ActionDialogContainer>
  );
};

export const DeleteHolidayDialog = ({ id }: { id: number }) => {
  const { open, setOpen } = useDialog();
  const { execute: deleteHoliday, isPending } = useAction(removeHolidayAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  return (
    <DeleteDialog
      title="Hapus Hari besar?"
      isPending={isPending}
      deleteAction={() => deleteHoliday({ id })}
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
