import { useAtom } from 'jotai';
import { desktopSidenavAtom } from '@/store';

const useSidebarDesktop = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(desktopSidenavAtom);

  return { sidebarOpen, setSidebarOpen };
};

export default useSidebarDesktop;
