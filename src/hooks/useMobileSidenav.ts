import { useAtom } from 'jotai';
import { mobileSidenavAtom } from '@/store';

const useMobileSidenav = () => {
  const [mobileSidenav, setMobileSidenav] = useAtom(mobileSidenavAtom);

  return { mobileSidenav, setMobileSidenav };
};

export default useMobileSidenav;
