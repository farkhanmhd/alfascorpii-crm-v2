import { useAtom } from 'jotai/react';
import { searchDialogAtom } from '@/store';

const useSearchDialog = () => {
  const [searchDialog, setSearchDialog] = useAtom(searchDialogAtom);

  return { searchDialog, setSearchDialog };
};

export default useSearchDialog;
