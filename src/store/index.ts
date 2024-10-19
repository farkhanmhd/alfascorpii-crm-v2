import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const searchDialogAtom = atom(false);
export const desktopSidenavAtom = atomWithStorage('desktopSidebar', false);

export const isMobileAtom = atom(false);
export const mobileSidenavAtom = atom(false);
export const createDialogAtom = atom(false);
export const editDialogAtom = atom(false);
export const activeButtonAtom = atomWithStorage<null | string>(
  'activeButton',
  null
);
export const openMenuAtom = atomWithStorage<null | string>('openMenu', null);
