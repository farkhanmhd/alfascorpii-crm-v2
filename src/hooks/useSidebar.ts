import { atom, useAtom } from "jotai";

const sidebarAtom = atom(true);

const useSidebar = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarAtom);

  return [isOpen, setIsOpen as any];
};

export default useSidebar;
