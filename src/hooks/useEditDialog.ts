import { useAtom } from 'jotai';
import { editDialogAtom } from '@/store';

const useEditDialog = () => {
  const [editDialog, setEditDialog] = useAtom(editDialogAtom);

  return { editDialog, setEditDialog };
};

export default useEditDialog;
