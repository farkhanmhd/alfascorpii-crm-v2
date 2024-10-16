import { useAtom } from 'jotai';
import { mobileSidenavAtom } from './../store/index';

const useMobileSidenav = () => {
  const [mobileSidenav, setMobileSidenav] = useAtom(mobileSidenavAtom);

  return { mobileSidenav, setMobileSidenav };
};

export default useMobileSidenav;
