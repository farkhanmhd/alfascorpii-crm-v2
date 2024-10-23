type Status = 'HIDE' | 'SHOW';
type ActiveStatus = 'AKTIF' | 'HOLD';
type ContactStatus = 'CONTACTED' | 'NOT CONTACTED';
type InterestStatus =
  | 'NOT CONTACTED'
  | 'TIDAK BERTEMU'
  | 'TIDAK BERMINAT'
  | 'MINAT'
  | 'PROSPECT';

interface IIdentifiable {
  id: string;
}

export interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  color?: string;
  isParent?: boolean;
  onClick?: () => void;
  childrens?: NavItem[];
}

export interface IStaff extends IIdentifiable {
  username: string;
  name: string;
  email: string;
  nip: string;
  status: string;
  role: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface IDealer extends IIdentifiable {
  kode: string;
  nama: string;
  status: Status;
}

export interface ICustomer extends IIdentifiable {
  dealer: string;
  name: string;
  phone: string;
  motor: string;
  follow_up: string;
  lokasi: string;
}

export interface IKerabat extends IIdentifiable {
  kerabat: string;
  status: Status;
}

export interface IPekerjaan extends IIdentifiable {
  pekerjaan: string;
  kode: string;
  status: Status;
}

export interface IPendidikan extends IIdentifiable {
  pendidikan: string;
  kode: string;
  status: Status;
}

interface IKeuangan extends IIdentifiable {
  batas_bawah: number;
  batas_atas: number;
  detail: string;
  kode: string;
  status: Status;
}

export interface IPengeluaran extends IKeuangan {}
export interface IPenghasilan extends IKeuangan {}

export interface IHobi extends IIdentifiable {
  hobi: string;
  status: Status;
}

export interface IStatusRumah extends IIdentifiable {
  status_rumah: string;
  status: Status;
}

export interface ILeasing extends IIdentifiable {
  nama: string;
}

export interface IDpackModel extends IIdentifiable {
  model: string;
  catalog: string;
  category: string;
  color: string;
}

export interface IHariBesar extends IIdentifiable {
  hari_besar: string;
  tanggal: string;
  agama: string;
  ucapan: string;
  status: ActiveStatus;
}

export interface IKeteranganFU extends IIdentifiable {
  keterangan: string;
  kategori_hasil: InterestStatus;
  status: ContactStatus;
}

export interface IMetodeFU extends IIdentifiable {
  metode: string;
  status: Status;
}

export interface IKeteranganHasil extends IIdentifiable {
  keterangan_hasil: InterestStatus;
  status_fu: ContactStatus;
  status: Status;
}

export interface ISearchQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export interface Column<T, K = keyof T> {
  header: string;
  key?: K;
  getCellContent: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  includeIndex?: boolean;
}

export interface IDialogTables {
  staff: boolean;
  customers: boolean;
  kerabat: boolean;
  pekerjaan: {
    open: boolean;
    id: string;
    pekerjaan: string;
    kode: string;
    status: Status;
  };
  pendidikan: boolean;
  pengeluaran: boolean;
  penghasilan: boolean;
  hobi: boolean;
  status_rumah: boolean;
  keterangan_fu: boolean;
  keterangan_hasil: boolean;
  dealer: boolean;
  leasing: boolean;
  model: boolean;
  hari_besar: boolean;
  metode_fu: boolean;
}

export type NavLinkProps = {
  href?: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isOpen?: boolean;
  showText: boolean;
};

export type NavLinksProps = {
  items: NavItem[];
  isOpen: boolean;
  isMobile?: boolean;
};

export interface NavLinkBaseProps {
  href: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isOpen?: boolean;
  isSubMenu?: boolean;
  show: boolean;
}

export interface SubMenuProp {
  href: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export type SearchQueryParams = {
  search?: string;
  page?: string;
  limit?: string;
};

export type ValidationError = {
  status: number;
  message: string;
  errors: Record<string, string[]>;
};

export type ApiResponse<T = any> = {
  status: number;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};
