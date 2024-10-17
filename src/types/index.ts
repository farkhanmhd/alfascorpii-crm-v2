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

export interface ISearchQuery {
  search?: string;
  page?: number;
  limit?: number;
}
