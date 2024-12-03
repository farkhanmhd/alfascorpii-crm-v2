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
  id: number | string;
  created_at?: string;
  updated_at?: string;
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
  customer_name: string;
  customer_address: string;
  province: string;
  district: string;
  sub_district: string;
  regency_or_city: string;
  postal_code?: string | null;
  telephone: string;
  mobile_phone: string;
  nik: string;
  dealer_name: string;
  dealer_code: string;
  dealer_area: string;
  motorcycle_type: string;
  frame_number: string;
  engine_number: string;
  payment_method: string;
  assembly_date: string; // Assuming this is a date in string format
  purchase_date: string | null;
  leasing?: string | null;
  latest_update_date: string; // Assuming this is a date in string format
  address: string;
  house_ownership_status: string;
  job_name: string;
  job_description: string;
  date_of_birth: string; // Assuming this is a date in string format
  religion: string;
  education_level: string;
  hobby: string;
  hobby_description: string;
  amount_of_family: number;
  family_under_12_yo: number;
  family_12_until_17_yo: number;
  amount_of_motorcycle: number;
  whatsapp_number: string;
  facebook: string;
  instagram: string;
  email: string;
  income_per_month: string;
  expense_per_month: string;
  data_source: string;
  customer_status: string;
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
  detail_fu_name: string;
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
