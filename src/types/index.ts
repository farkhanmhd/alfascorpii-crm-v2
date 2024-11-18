import React from 'react';

type Status = 'HIDE' | 'SHOW';
// type ActiveStatus = 'AKTIF' | 'HOLD';
// type ContactStatus = 'CONTACTED' | 'NOT CONTACTED';
// type InterestStatus =
//   | 'NOT CONTACTED'
//   | 'TIDAK BERTEMU'
//   | 'TIDAK BERMINAT'
//   | 'MINAT'
//   | 'PROSPECT';

export interface SearchParamsProps {
  search?: string;
  page?: string;
  perPage?: string;
}

interface IIdentifiable {
  id: number;
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

export type DealerArea =
  | 'Aceh'
  | 'Sumatera Utara'
  | 'Medan'
  | 'Riau'
  | 'Kepulauan Riau';
export type DealerType = 'MDS' | 'Independen';

export interface IDealer extends IIdentifiable {
  dealer_code: string;
  dealer_name: string;
  dealer_area: DealerArea;
  dealer_type: DealerType;
}

export interface ICustomer extends IIdentifiable {
  dealer: string;
  name: string;
  location: string;
  phone: string;
  motor: string;
  purchase_date: string;
  update: string;
  follow_up: string;
  status: string;
}

export interface IRelation extends IIdentifiable {
  relation_name: string;
  status: Status;
}

export interface IFollowUp extends IIdentifiable {
  follow_up: string;
  phone_receiver: string;
  relationship: string;
  whatsapp: string;
  date: string;
  method: string;
  status: string;
  result: string;
  motorcycle: string;
}

export interface ICustomerJob extends IIdentifiable {
  job_code: string;
  job_name: string;
  status: Status;
}

export interface IDegree extends IIdentifiable {
  degree_code: string;
  degree_name: string;
  status: Status;
}

export interface IExpense extends IIdentifiable {
  expense_upper_limit: string;
  expense_lower_limit: string;
  expense_detail: string;
  expense_code: string;
  status: Status;
}

export interface IIncome extends IIdentifiable {
  income_upper_limit: string;
  income_lower_limit: string;
  income_detail: string;
  income_code: string;
  status: Status;
}

export interface IHobby extends IIdentifiable {
  hobby_name: string;
  status: Status;
}

export interface IHouseOwnership extends IIdentifiable {
  house_ownership_status: string;
  status: Status;
}

export interface ILeasing extends IIdentifiable {
  leasing_name: string;
}

export interface IDpackModel extends IIdentifiable {
  model: string;
  catalog: string;
  category: string;
  color: string;
}

export interface IHolidays extends IIdentifiable {
  holiday_name: string;
  holiday_date: string;
  message: string;
  status: Status;
}

export interface IStatusFU extends IIdentifiable {
  fu_method_id: number;
  detail_fu_name: string | null;
  status: Status;
}

export interface IFUMethod extends IIdentifiable {
  fu_method_name: string;
  status: Status;
}

export interface IResultFU extends IIdentifiable {
  fu_result_name: string;
  status: Status;
}

export interface IDetailFU extends IIdentifiable {
  status_fu_id: number;
  detail_fu_name: string | null;
  status: Status;
}

export interface IProductPreferences extends IIdentifiable {
  product_name: string;
}

export interface ISearchQuery {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface Column<T, K = keyof T> {
  header: string;
  key?: K;
  GetCellContent: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  includeIndex?: boolean;
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
  size?: string;
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
  per_page?: string;
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

export type DeleteDialog = {
  open: boolean;
  id: number | string | null;
};

export type ActionDialog<T> = {
  create?: boolean;
  edit?: boolean;
  data?: T;
};

export type ComboBoxOptions = {
  label: string;
  value: string;
};

export type CustomerFilters = {
  dateOptions?: string | null;
  selectedDate?: string | null;
  profileUpdate?: string | null;
  followUp?: string | null;
  fuMethod?: string | null;
  fuResult?: string | null;
  product?: string | null;
  purchasedProduct?: string | null;
  desiredProduct?: string | null;
  area?: string | null;
  dealer?: string | null;
  income?: string | null;
  houseOwnership?: string | null;
};

export type UserSession = {
  userId: string;
  name: string;
  username: string;
  status: string;
  avatar?: string;
};

export type TabData<T> = {
  value: string;
  label: string;
  content: T;
};

export interface TableConfig<T> {
  pathname: string;
  searchPlaceholder: string;
  addButtonLabel: string;
  CreateDialog: React.ComponentType;
  EditDialog: React.ComponentType;
  DeleteDialog: React.ComponentType;
  type: T;
}
