import { useAtom } from 'jotai';
import { sidebarDesktopAtom } from '@/store';

const useSidebarDesktop = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarDesktopAtom);

  return { sidebarOpen, setSidebarOpen };
};

export default useSidebarDesktop;
