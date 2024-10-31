import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { DeleteDialog, ActionDialog } from '@/types';

export const searchDialogAtom = atom<boolean>(false);

export const desktopSidenavAtom = atomWithStorage<boolean>(
  'desktopSidebar',
  false
);

export const isMobileAtom = atom<boolean>(false);
export const mobileSidenavAtom = atom<boolean>(false);
export const activeButtonAtom = atomWithStorage<null | string>(
  'activeButton',
  null
);
export const openMenuAtom = atomWithStorage<null | string>('openMenu', null);

export const deleteDialogAtom = atom<DeleteDialog | null>({
  open: false,
  id: null,
});

export const actionDialogAtom = atom<ActionDialog<unknown> | null>(null);
