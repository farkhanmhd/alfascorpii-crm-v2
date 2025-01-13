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
export type DealerType = 'MDS' | 'Independen' | 'Non Independent';

export interface IDealer extends IIdentifiable {
  dealer_code: string;
  dealer_name: string;
  dealer_area: DealerArea;
  dealer_type: DealerType;
}

export interface IMotorcycle extends IIdentifiable {
  name: string;
  color: string;
  frame_number: string;
  engine_number: string;
  payment_method: string;
  assembly_date: string;
  purchase_date: string;
  leasing_name: string;
}

export interface IFollowUpRecipient {
  recipient_name: string;
  relationship: string;
  recipient_address: string;
  house_ownership: string;
  job: string;
  holiday: string;
  recipient_job_detail: string | null;
  recipient_born_date: string;
  recipient_religion: string | null;
  hobby: string;
  recipient_hobby_detail: string;
  amount_of_family: number;
  family_under_12_yo: number | null;
  family_12_until_17_yo: number | null;
  amount_of_motorcycle: number;
  whatsapp_number: string;
  facebook: string;
  instagram: string;
  email: string;
  income: number | null;
  expense: number | null;
  additional_information: string | null;
}

export interface ICustomerFollowUp extends IIdentifiable {
  user: string | null;
  recipient: string;
  relationship: string;
  whatsapp_number: string;
  additional_information: string | null;
  follow_up_date: string;
  imported_date: string | null;
  assigned_date: string | null;
  follow_up_method: string;
  follow_up_status: string;
  follow_up_detail: string | null;
  follow_up_result: string | null;
  follow_up_note: string | null;
  product_preferences: string | null;
  status: string;
}

export interface ICustomerMotorcycle extends IIdentifiable {
  customer: string;
  name: string;
  dealer_name: string;
  dealer_code: string;
  color: string | null;
  frame_number: string;
  engine_number: string;
  payment_method: string;
  assembly_date: string | null;
  purchase_date: string;
  leasing_name: string;
}

export interface IIsCustomer {
  exists: boolean;
  data: string | null;
}

export interface IFamilyMember extends IIdentifiable {
  name: string;
  nik: string;
  born_place: string;
  born_date: string;
  gender: string;
  religion: string;
  occupation: string;
  education: string;
  marital_status: string;
  relation_status: string;
  is_customer: IIsCustomer;
}

export interface IFamilyCard {
  family_card_number: string;
  family_list: IFamilyMember[];
  related_person: IFamilyMember[];
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
  data_source: string;
  latest_update_date: string; // Assuming this is a date in string format
  customer_status: string;
  address: string;
  house_ownership: string;
  job: string;
  date_of_birth: string; // Assuming this is a date in string format
  religion: string;
  degree: string;
  hobby: string;
  user: string | null;
  hobby_description: string;
  amount_of_family: number;
  family_under_12_yo: number;
  family_12_until_17_yo: number;
  whatsapp_number: string;
  facebook: string;
  instagram: string;
  email: string;
  income: string;
  expense: string;
  holiday: string;
  motorcycles: ICustomerMotorcycle[];
  family_card: IFamilyCard;
  follow_up_recipient: IFollowUpRecipient;
  follow_up: ICustomerFollowUp[];
}

export interface FamilyMemberPayload extends IIdentifiable {
  nik: string;
  name: string;
  born_place: string;
  born_date: string;
  gender: string;
  religion: string;
  occupation: string;
  education: string;
  marital_status: string;
  relation_status: string;
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

export interface IMotorcycleList extends IIdentifiable {
  motorcycle_type: string;
  colors: string[];
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
  open?: boolean;
  data?: T;
};

export type ComboBoxOptions = {
  label: string;
  value: string;
};

export interface SelectOptions extends ComboBoxOptions {}

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
