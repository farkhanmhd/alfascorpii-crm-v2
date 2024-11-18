import React from 'react';

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
  IProductPreferences,
  ICustomer,
} from '@/types';
import {
  CreateFuResultDialog,
  EditFuResultDialog,
  DeleteFuResultDialog,
} from './(follow-up)/furesult/actions';

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
} from './(follow-up)/fumethod/actions';

import {
  CreateProductDialog,
  EditProductDialog,
  DeleteProductDialog,
} from './productpreferences/actions';

const FuDetailDialog: React.FC = () => {
  return <div>Dialog</div>;
};

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
  | IProductPreferences
  | ICustomer
>[] = [
  {
    pathname: '/customerjobs',
    searchPlaceholder: 'Search Job',
    addButtonLabel: 'Add Job',
    CreateDialog: CreateCustomerJobDialog,
    EditDialog: EditCustomerJobDialog,
    DeleteDialog: DeleteJobDialog,
    type: {} as ICustomerJob,
  },
  {
    pathname: '/dealers',
    searchPlaceholder: 'Search Dealer',
    addButtonLabel: 'Add Dealer',
    CreateDialog: CreateDealerDialog,
    EditDialog: EditDealerDialog,
    DeleteDialog: DeleteDealerDialog,
    type: {} as IDealer,
  },
  {
    pathname: '/degrees',
    searchPlaceholder: 'Search Degree',
    addButtonLabel: 'Add Degree',
    CreateDialog: CreateDegreeDialog,
    EditDialog: EditDegreeDialog,
    DeleteDialog: DeleteDegreeDialog,
    type: {} as IDegree,
  },
  {
    pathname: '/expenses',
    searchPlaceholder: 'Search Expense',
    addButtonLabel: 'Add Expense',
    CreateDialog: CreateExpenseDialog,
    EditDialog: EditExpenseDialog,
    DeleteDialog: DeleteExpenseDialog,
    type: {} as IExpense,
  },
  {
    pathname: '/hobbies',
    searchPlaceholder: 'Search Hobby',
    addButtonLabel: 'Add Hobby',
    CreateDialog: CreateHobbyDialog,
    EditDialog: EditHobbyDialog,
    DeleteDialog: DeleteHobbyDialog,
    type: {} as IHobby,
  },
  {
    // not working because the date is empty. will be fixed later
    pathname: '/holidays',
    searchPlaceholder: 'Search Holiday',
    addButtonLabel: 'Add Holiday',
    CreateDialog: CreateHolidayDialog,
    EditDialog: EditHolidayDialog,
    DeleteDialog: DeleteHolidayDialog,
    type: {} as IHolidays,
  },
  {
    pathname: '/houseownerships',
    searchPlaceholder: 'Search House Ownership',
    addButtonLabel: 'Add House Ownership',
    CreateDialog: CreateHouseOwnershipDialog,
    EditDialog: EditHouseOwnershipDialog,
    DeleteDialog: RemoveHouseOwnershipDialog,
    type: {} as IHouseOwnership,
  },
  {
    pathname: '/incomes',
    searchPlaceholder: 'Search Income',
    addButtonLabel: 'Add Income',
    CreateDialog: CreateIncomeDialog,
    EditDialog: EditIncomeDialog,
    DeleteDialog: DeleteIncomeDialog,
    type: {} as IIncome,
  },
  {
    pathname: '/leasing',
    searchPlaceholder: 'Search Leasing',
    addButtonLabel: 'Add Leasing',
    CreateDialog: CreateLeasingDialog,
    EditDialog: EditLeasingDialog,
    DeleteDialog: DeleteLeasingDialog,
    type: {} as ILeasing,
  },
  {
    pathname: '/relations',
    searchPlaceholder: 'Search Relation',
    addButtonLabel: 'Add Relation',
    CreateDialog: CreateRelationDialog,
    EditDialog: EditRelationDialog,
    DeleteDialog: DeleteRelationDialog,
    type: {} as IRelation,
  },
  {
    pathname: '/fumethod',
    searchPlaceholder: 'Search Method',
    addButtonLabel: 'Add Method',
    CreateDialog: CreateFuMethodDialog,
    EditDialog: EditFuMethodDialog,
    DeleteDialog: DeleteFuMethodDialog,
    type: {} as IFUMethod,
  },
  {
    pathname: '/furesult',
    searchPlaceholder: 'Follow Up Result',
    addButtonLabel: 'Add FU Result',
    CreateDialog: CreateFuResultDialog,
    EditDialog: EditFuResultDialog,
    DeleteDialog: DeleteFuResultDialog,
    type: {} as IResultFU,
  },
  {
    // dialog form hasnt made and api not consumed yet. will fixed later
    pathname: '/keteranganfu',
    searchPlaceholder: 'Follow Up Detail',
    addButtonLabel: 'Add FU Detail',
    CreateDialog: FuDetailDialog,
    EditDialog: FuDetailDialog,
    DeleteDialog: FuDetailDialog,
    type: {} as IDetailFU,
  },
  {
    pathname: '/productpreferences',
    searchPlaceholder: 'Search Product',
    addButtonLabel: 'Add Product',
    CreateDialog: CreateProductDialog,
    EditDialog: EditProductDialog,
    DeleteDialog: DeleteProductDialog,
    type: {} as IProductPreferences,
  },
];

export default TableLayoutConfig;
