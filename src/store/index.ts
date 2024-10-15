import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const searchDialogAtom = atom(false);
export const sidebarDesktopAtom = atomWithStorage(
  'desktopSidebar',
  Boolean(localStorage && localStorage.getItem('desktopSidebar'))
);
