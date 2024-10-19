import { useAtom } from 'jotai';
import { activeButtonAtom } from '@/store';

export const useActiveButton = () => {
  const [activeButton, setActiveButton] = useAtom(activeButtonAtom);

  return { activeButton, setActiveButton };
};
