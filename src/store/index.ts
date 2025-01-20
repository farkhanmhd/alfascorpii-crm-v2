import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { DeleteDialog, ActionDialog, CustomerFilters } from '@/types';

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

export const selectedDateAtom = atom<Date | string | number | undefined>(
  undefined
);

export const customerFiltersAtom = atom<CustomerFilters>({
  dateOptions: null,
  selectedDate: null,
  followUp: null,
  fuMethod: null,
  fuResult: null,
  product: null,
  purchasedProduct: null,
  desiredProduct: null,
  area: null,
  dealer: null,
  income: null,
  houseOwnership: null,
});

export const customerFilterSheetAtom = atom<boolean>(false);

export const permissionsAtom = atom<string[]>([]);
