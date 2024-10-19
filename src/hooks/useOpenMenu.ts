import { useAtom } from 'jotai';
import { openMenuAtom } from '@/store';

export const useOpenMenu = () => {
  const [openMenu, setOpenMenu] = useAtom(openMenuAtom);

  return { openMenu, setOpenMenu };
};
