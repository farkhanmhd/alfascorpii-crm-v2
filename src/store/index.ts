import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const searchDialogAtom = atom(false);
export const desktopSidenavAtom = atomWithStorage(
  'desktopSidebar',
  Boolean(localStorage.getItem('desktopSidebar'))
);
export const isMobileAtom = atom(window.innerWidth < 768);
export const mobileSidenavAtom = atom(false);
