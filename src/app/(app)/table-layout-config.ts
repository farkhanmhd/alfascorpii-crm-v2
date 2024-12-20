import {
  TableConfig,
  ICustomerJob,
  IDealer,
  IRelation,
  IDegree,
  IExpense,
  IHobby,
  IHolidays,
  IHouseOwnership,
  IIncome,
  ILeasing,
  IFUMethod,
  IResultFU,
  IDetailFU,
  IMotorcycle,
  ICustomer,
  IStatusFU,
} from '@/types';
import {
  CreateFuResultDialog,
  EditFuResultDialog,
  DeleteFuResultDialog,
} from './(masterdata)/furesult/actions';

import {
  CreateCustomerJobDialog,
  EditCustomerJobDialog,
  DeleteJobDialog,
} from './(masterdata)/customerjobs/actions';

import {
  CreateDealerDialog,
  EditDealerDialog,
  DeleteDealerDialog,
} from './(masterdata)/dealers/actions';

import {
  CreateDegreeDialog,
  EditDegreeDialog,
  DeleteDegreeDialog,
} from './(masterdata)/degrees/actions';

import {
  CreateExpenseDialog,
  EditExpenseDialog,
  DeleteExpenseDialog,
} from './(masterdata)/expenses/actions';

import {
  CreateHobbyDialog,
  EditHobbyDialog,
  DeleteHobbyDialog,
} from './(masterdata)/hobbies/actions';

import {
  CreateHolidayDialog,
  EditHolidayDialog,
  DeleteHolidayDialog,
} from './(masterdata)/holidays/actions';

import {
  CreateHouseOwnershipDialog,
  EditHouseOwnershipDialog,
  RemoveHouseOwnershipDialog,
} from './(masterdata)/houseownerships/actions';

import {
  CreateIncomeDialog,
  EditIncomeDialog,
  DeleteIncomeDialog,
} from './(masterdata)/incomes/actions';

import {
  CreateLeasingDialog,
  EditLeasingDialog,
  DeleteLeasingDialog,
} from './(masterdata)/leasing/actions';

import {
  CreateRelationDialog,
  EditRelationDialog,
  DeleteRelationDialog,
} from './(masterdata)/relations/actions';

import {
  CreateFuMethodDialog,
  EditFuMethodDialog,
  DeleteFuMethodDialog,
} from './(masterdata)/fumethod/actions';

import {
  CreateProductDialog,
  EditProductDialog,
  DeleteProductDialog,
} from './(masterdata)/motorcycles/actions';

import {
  CreateDetailFuDialog,
  EditDetailFuDialog,
  DeleteDetailFuDialog,
} from './(masterdata)/detailfu/actions';

const TableLayoutConfig: TableConfig<
  | ICustomerJob
  | IDealer
  | IDegree
  | IExpense
  | IHobby
  | IHolidays
  | IHouseOwnership
  | IIncome
  | ILeasing
  | IRelation
  | IFUMethod
  | IResultFU
  | IDetailFU
  | IStatusFU
  | IMotorcycle
  | ICustomer
>[] = [
  {
    pathname: '/customerjobs',
    searchPlaceholder: 'Cari Pekerjaan',
    addButtonLabel: 'Tambah Pekerjaan',
    CreateDialog: CreateCustomerJobDialog,
    EditDialog: EditCustomerJobDialog,
    DeleteDialog: DeleteJobDialog,
    type: {} as ICustomerJob,
  },
  {
    pathname: '/dealers',
    searchPlaceholder: 'Cari Dealer',
    addButtonLabel: 'Tambah Dealer',
    CreateDialog: CreateDealerDialog,
    EditDialog: EditDealerDialog,
    DeleteDialog: DeleteDealerDialog,
    type: {} as IDealer,
  },
  {
    pathname: '/degrees',
    searchPlaceholder: 'Cari Pendidikan',
    addButtonLabel: 'Tambah Pendidikan',
    CreateDialog: CreateDegreeDialog,
    EditDialog: EditDegreeDialog,
    DeleteDialog: DeleteDegreeDialog,
    type: {} as IDegree,
  },
  {
    pathname: '/expenses',
    searchPlaceholder: 'Cari Pengeluaran',
    addButtonLabel: 'Tambah Pengeluaran',
    CreateDialog: CreateExpenseDialog,
    EditDialog: EditExpenseDialog,
    DeleteDialog: DeleteExpenseDialog,
    type: {} as IExpense,
  },
  {
    pathname: '/hobbies',
    searchPlaceholder: 'Cari Hobi',
    addButtonLabel: 'Tambah Hobi',
    CreateDialog: CreateHobbyDialog,
    EditDialog: EditHobbyDialog,
    DeleteDialog: DeleteHobbyDialog,
    type: {} as IHobby,
  },
  {
    // not working because the date is empty. will be fixed later
    pathname: '/holidays',
    searchPlaceholder: 'Cari Hari Besar',
    addButtonLabel: 'Tambah Hari Besar',
    CreateDialog: CreateHolidayDialog,
    EditDialog: EditHolidayDialog,
    DeleteDialog: DeleteHolidayDialog,
    type: {} as IHolidays,
  },
  {
    pathname: '/houseownerships',
    searchPlaceholder: 'Cari Status Rumah',
    addButtonLabel: 'Tambah Status Rumah',
    CreateDialog: CreateHouseOwnershipDialog,
    EditDialog: EditHouseOwnershipDialog,
    DeleteDialog: RemoveHouseOwnershipDialog,
    type: {} as IHouseOwnership,
  },
  {
    pathname: '/incomes',
    searchPlaceholder: 'Cari Pendapatan',
    addButtonLabel: 'Tambah Pendapatan',
    CreateDialog: CreateIncomeDialog,
    EditDialog: EditIncomeDialog,
    DeleteDialog: DeleteIncomeDialog,
    type: {} as IIncome,
  },
  {
    pathname: '/leasing',
    searchPlaceholder: 'Cari Leasing',
    addButtonLabel: 'Tambah Leasing',
    CreateDialog: CreateLeasingDialog,
    EditDialog: EditLeasingDialog,
    DeleteDialog: DeleteLeasingDialog,
    type: {} as ILeasing,
  },
  {
    pathname: '/relations',
    searchPlaceholder: 'Cari Relasi',
    addButtonLabel: 'Tambah Relasi',
    CreateDialog: CreateRelationDialog,
    EditDialog: EditRelationDialog,
    DeleteDialog: DeleteRelationDialog,
    type: {} as IRelation,
  },
  {
    pathname: '/fumethod',
    searchPlaceholder: 'Cari Metode FU',
    addButtonLabel: 'Tambah Metode FU',
    CreateDialog: CreateFuMethodDialog,
    EditDialog: EditFuMethodDialog,
    DeleteDialog: DeleteFuMethodDialog,
    type: {} as IFUMethod,
  },
  {
    pathname: '/furesult',
    searchPlaceholder: 'Cari Hasil Follow Up',
    addButtonLabel: 'Tambah Hasil',
    CreateDialog: CreateFuResultDialog,
    EditDialog: EditFuResultDialog,
    DeleteDialog: DeleteFuResultDialog,
    type: {} as IResultFU,
  },
  {
    // dialog form hasnt made and api not consumed yet. will fixed later
    pathname: '/detailfu',
    searchPlaceholder: 'Cari Detail Follow Up',
    addButtonLabel: 'Tambah Detail',
    CreateDialog: CreateDetailFuDialog,
    EditDialog: EditDetailFuDialog,
    DeleteDialog: DeleteDetailFuDialog,
    type: {} as IDetailFU,
  },
  {
    // dialog form hasnt made and api not consumed yet. will fixed later
    pathname: '/statusfus',
    searchPlaceholder: 'Cari Status Follow Up',
    addButtonLabel: 'Tambah Status',
    CreateDialog: CreateDetailFuDialog,
    EditDialog: EditDetailFuDialog,
    DeleteDialog: DeleteDetailFuDialog,
    type: {} as IDetailFU,
  },
  {
    pathname: '/motorcycles',
    searchPlaceholder: 'Cari Sepeda Motor',
    addButtonLabel: 'Tambah Sepeda Motor',
    CreateDialog: CreateProductDialog,
    EditDialog: EditProductDialog,
    DeleteDialog: DeleteProductDialog,
    type: {} as IMotorcycle,
  },
];

export default TableLayoutConfig;
