'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useDeleteDialog } from '@/hooks';

const DeletePekerjaanButton = ({ id }: { id: number }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setDeleteDialog } = useDeleteDialog();
  const openDeleteDialog = () => {
    setDeleteDialog((prevState) => ({
      ...prevState,
      pekerjaan: {
        ...prevState.pekerjaan,
        open: true,
        id,
      },
    }));
    const searchParams = new URLSearchParams();
    searchParams.set('id', String(id));
    router.replace(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <Button variant="ghost" size="icon" onClick={openDeleteDialog}>
      <Trash />
    </Button>
  );
};

export default DeletePekerjaanButton;
