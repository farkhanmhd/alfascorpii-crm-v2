export interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  color?: string;
  isParent?: boolean;
  onClick?: () => void;
  childrens?: NavItem[];
}

export interface IStaff {
  id: string;
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

export interface IDealer {
  id: string;
  kode: string;
  nama: string;
  status: 'HIDE' | 'SHOW';
}

export interface ICustomer {
  id: string;
  dealer: string;
  name: string;
  phone: string;
  motor: string;
  follow_up: string;
  lokasi: string;
}

export interface IKerabat {
  id: string;
  kerabat: string;
  status: 'HIDE' | 'SHOW';
}

export interface IPekerjaan {
  id: string;
  pekerjaan: string;
  kode: string;
  status: 'HIDE' | 'SHOW';
}

export interface IPendidikan {
  id: string;
  pendidikan: string;
  kode: string;
  status: 'HIDE' | 'SHOW';
}

interface IKeuangan {
  id: string;
  batas_bawah: number;
  batas_atas: number;
  detail: string;
  kode: string;
  status: 'HIDE' | 'SHOW';
}

export interface IPengeluaran extends IKeuangan {}

export interface IPenghasilan extends IKeuangan {}

export interface IHobi {
  id: string;
  hobi: string;
  status: 'HIDE' | 'SHOW';
}

export interface IStatusRumah {
  id: string;
  status_rumah: string;
  status: 'HIDE' | 'SHOW';
}

export interface ILeasing {
  id: string;
  nama: string;
}

export interface IDpackModel {
  id: string;
  model: string;
  catalog: string;
  category: string;
  color: string;
}

export interface IHariBesar {
  id: string;
  hari_besar: string;
  tanggal: string;
  agama: string;
  ucapan: string;
  status: 'AKTIF' | 'HOLD';
}

export interface IKeteranganFU {
  id: string;
  keterangan: string;
  kategori_hasil:
    | 'NOT CONTACTED'
    | 'TIDAK BERTEMU'
    | 'TIDAK BERMINAT'
    | 'MINAT'
    | 'PROSPECT';
  status: 'CONTACTED' | 'NOT CONTACTED';
}

export interface IMetodeFU {
  id: string;
  metode: string;
  status: 'SHOW' | 'HIDE';
}

export interface IKeteranganHasil {
  id: string;
  keterangan_hasil:
    | 'NOT CONTACTED'
    | 'TIDAK BERTEMU'
    | 'TIDAK BERMINAT'
    | 'MINAT'
    | 'PROSPECT';
  status_fu: 'CONTACTED' | 'NOT CONTACTED';
  status: 'SHOW' | 'HIDE';
}

export interface ISearchQuery {
  search?: string;
  page?: number;
  limit?: number;
}
