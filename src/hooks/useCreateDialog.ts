'use client';

import { useAtom } from 'jotai';
import { createDialogAtom } from '@/store/index';

const useCreateDialog = () => {
  const [createDialog, setCreateDialog] = useAtom(createDialogAtom);

  return { createDialog, setCreateDialog };
};

export default useCreateDialog;
