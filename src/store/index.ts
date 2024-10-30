import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { IDialogTables } from '@/types';

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

const dialogTables: IDialogTables = {
  staff: false,
  customers: false,
  kerabat: false,
  pekerjaan: {
    open: false,
    id: null,
    pekerjaan: '',
    kode: '',
    status: 'SHOW',
  },
  pendidikan: false,
  pengeluaran: false,
  income: false,
  hobi: false,
  house_ownership_status: false,
  keterangan_fu: false,
  keterangan_hasil: false,
  dealers: false,
  leasing: false,
  model: false,
  holiday_name: false,
  metode_fu: false,
};

export const createDialogAtom = atom<IDialogTables>(dialogTables);
export const editDialogAtom = atom<IDialogTables>(dialogTables);
export const deleteDialogAtom = atom<IDialogTables>(dialogTables);
