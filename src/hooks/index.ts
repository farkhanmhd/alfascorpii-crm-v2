'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  activeButtonAtom,
  createDialogAtom,
  editDialogAtom,
  isMobileAtom,
  mobileSidenavAtom,
  openMenuAtom,
  searchDialogAtom,
  desktopSidenavAtom,
  deleteDialogAtom,
} from '@/store';

export const useActiveButton = () => {
  const [activeButton, setActiveButton] = useAtom(activeButtonAtom);

  return { activeButton, setActiveButton };
};

export const useCreateDialog = () => {
  const [createDialog, setCreateDialog] = useAtom(createDialogAtom);

  return { createDialog, setCreateDialog };
};

export const useEditDialog = () => {
  const [editDialog, setEditDialog] = useAtom(editDialogAtom);

  return { editDialog, setEditDialog };
};

export const useDeleteDialog = () => {
  const [deleteDialog, setDeleteDialog] = useAtom(deleteDialogAtom);

  return { deleteDialog, setDeleteDialog };
};

export const useMobile = () => {
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, [setIsMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsMobile]);

  return { isMobile, setIsMobile };
};

export const useMobileSidenav = () => {
  const [mobileSidenav, setMobileSidenav] = useAtom(mobileSidenavAtom);

  return { mobileSidenav, setMobileSidenav };
};

export const useOpenMenu = () => {
  const [openMenu, setOpenMenu] = useAtom(openMenuAtom);

  return { openMenu, setOpenMenu };
};

export const useSearchDialog = () => {
  const [searchDialog, setSearchDialog] = useAtom(searchDialogAtom);

  return { searchDialog, setSearchDialog };
};

export const useSidebarDesktop = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(desktopSidenavAtom);

  return { sidebarOpen, setSidebarOpen };
};
