'use client';

import { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { RowSelectionState } from '@tanstack/react-table';
import {
  activeButtonAtom,
  isMobileAtom,
  mobileSidenavAtom,
  openMenuAtom,
  searchDialogAtom,
  desktopSidenavAtom,
  deleteDialogAtom,
  actionDialogAtom,
  selectedDateAtom,
  customerFiltersAtom,
  customerFilterSheetAtom,
  rowSelectionAtom,
} from '@/store';
import { ActionDialog, CustomerFilters } from '@/types';
import { useDebouncedCallback } from 'use-debounce';
import { useToast } from './use-toast';

export const useActiveButton = () => {
  const [activeButton, setActiveButton] = useAtom(activeButtonAtom);

  return { activeButton, setActiveButton };
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

export const useSubmitToast = (
  result: any,
  onSuccessNavigate: () => void,
  onErrorReset: () => void
) => {
  const { toast } = useToast();
  useEffect(() => {
    if (result?.data?.status === 'success') {
      toast({
        title: 'Success',
        description: result.data.message,
        duration: 3000,
      });
      onSuccessNavigate();
    } else if (result?.data?.status === 'error') {
      toast({
        title: 'Error',
        description: result.data.message,
        variant: 'destructive',
        duration: 3000,
      });
      onErrorReset();
    }
  }, [result, toast, onSuccessNavigate, onErrorReset]);
};

export const useDeleteToast = (
  deleteResult: any,
  onErrorRevert: () => void
) => {
  const { toast } = useToast();
  const { setDeleteDialog } = useDeleteDialog();
  useEffect(() => {
    if (deleteResult?.data?.status === 'success') {
      toast({
        title: 'Success',
        description: deleteResult.data.message,
        duration: 3000,
      });
      setDeleteDialog({ open: false, id: null });
    } else if (deleteResult?.data?.status === 'error') {
      toast({
        title: 'Error',
        description: deleteResult.data.message,
        variant: 'destructive',
        duration: 3000,
      });
      onErrorRevert();
    }
  }, [deleteResult, toast, setDeleteDialog, onErrorRevert]);
};

export const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  return { selectedDate, setSelectedDate };
};

export const useActionDialog = <T>() => {
  const [actionDialog, setActionDialog] = useAtom(actionDialogAtom);
  const { setSelectedDate } = useSelectedDate();

  const handleClose = () => {
    setActionDialog(null);
    setSelectedDate(new Date().toString());
  };

  return {
    actionDialog: actionDialog as ActionDialog<T> | null,
    setActionDialog,
    handleClose,
  };
};

export const useElementWidth = () => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [elementWidth, setElementWidth] = useState(0);

  const handleResize = useDebouncedCallback(() => {
    const newWidth = elementRef.current?.getBoundingClientRect().width || 0;
    setElementWidth(newWidth);
  }, 300);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef.current?.offsetWidth, handleResize]);

  return { elementRef, elementWidth };
};

export const useCustomerFilters = () => {
  const [customerFilters, setCustomerFilters] =
    useAtom<CustomerFilters>(customerFiltersAtom);

  return { customerFilters, setCustomerFilters };
};

export const useCustomerSheet = () => {
  const [openSheet, setOpenSheet] = useAtom(customerFilterSheetAtom);

  return { openSheet, setOpenSheet };
};

export const useSelectedRows = (key: string) => {
  const [selectedRowsState, setRowSelectionState] = useAtom(rowSelectionAtom);

  const selectedRows = selectedRowsState?.[key] || {};

  const setSelectedRows = (rows: RowSelectionState) => {
    setRowSelectionState((prevSelectedRows) => ({
      ...prevSelectedRows,
      [key]: rows,
    }));
  };

  return { selectedRows, setSelectedRows };
};
