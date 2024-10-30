import React from 'react';

import {
  LayoutDashboard,
  Database,
  User,
  Users,
  Building,
  DollarSign,
  FileChartLineIcon,
  Calendar,
  MessageSquare,
  Table,
  LucideTable2,
  Briefcase,
  GraduationCap,
  CreditCard,
  Wallet,
  Camera,
  House,
  Phone,
  Logs,
  Bike,
} from 'lucide-react';
import { type NavItem } from '@/types';

export const NavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard />,
    href: '/',
  },
  {
    title: 'Master Data',
    icon: <Database />,
    isParent: true,
    childrens: [
      {
        title: 'Dealers',
        icon: <Building />,
        href: '/dealers',
      },
      {
        title: 'Leasing',
        icon: <DollarSign />,
        href: '/leasing',
      },
      // {
      //   title: 'Model',
      //   icon: <FileChartLineIcon />,
      //   href: '/model',
      // },
      {
        title: 'Hari Besar',
        icon: <Calendar />,
        href: '/holidays',
      },
    ],
  },
  // {
  //   title: 'Staff',
  //   icon: <User />,
  //   href: '/staff',
  // },
  {
    title: 'Customers',
    icon: <Users />,
    isParent: true,
    childrens: [
      // {
      //   title: 'Daftar Customer',
      //   icon: <Users />,
      //   href: '/customers',
      // },
      {
        title: 'Kerabat',
        icon: <Users />,
        href: '/customers/relations',
      },
      {
        title: 'Pekerjaan',
        icon: <Briefcase />,
        href: '/customers/customerjobs',
      },
      {
        title: 'Pendidikan',
        icon: <GraduationCap />,
        href: '/customers/degrees',
      },
      {
        title: 'Pengeluaran',
        icon: <CreditCard />,
        href: '/customers/expenses',
      },
      {
        title: 'Penghasilan',
        icon: <Wallet />,
        href: '/customers/incomes',
      },
      {
        title: 'Hobi',
        icon: <Camera />,
        href: '/customers/hobbies',
      },
      {
        title: 'Status Rumah',
        icon: <House />,
        href: '/customers/houseownerships',
      },
    ],
  },
  {
    title: 'Products',
    icon: <Bike />,
    href: '/productpreferences',
  },
  {
    title: 'Follow Up',
    icon: <Phone />,
    isParent: true,
    childrens: [
      {
        title: 'Metode FU',
        icon: <MessageSquare />,
        href: '/fumethod',
      },
      {
        title: 'Status FU',
        icon: <Table />,
        href: '/statusfus',
      },
      {
        title: 'Hasil FU',
        icon: <LucideTable2 />,
        href: '/furesult',
      },
      {
        title: 'Detail FU',
        icon: <Logs />,
        href: '/detailfu',
      },
    ],
  },
];

export const MobileNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard />,
    href: '/',
  },
  {
    title: 'Customers',
    icon: <Users />,
    href: '/customers',
  },
];

export const MobileSidenavItems: NavItem[] = [
  // {
  //   title: 'Staff',
  //   icon: <User />,
  //   href: '/staff',
  // },
  {
    title: 'Master Data',
    icon: <Database />,
    isParent: true,
    childrens: [
      {
        title: 'Dealers',
        icon: <Building />,
        href: '/dealers',
      },
      {
        title: 'Leasing',
        icon: <DollarSign />,
        href: '/leasing',
      },
      // {
      //   title: 'Model',
      //   icon: <FileChartLineIcon />,
      //   href: '/model',
      // },
      {
        title: 'Hari Besar',
        icon: <Calendar />,
        href: '/holidays',
      },
    ],
  },
  {
    title: 'Customers',
    icon: <Users />,
    isParent: true,
    childrens: [
      // {
      //   title: 'Daftar Customer',
      //   icon: <Users />,
      //   href: '/customers',
      // },
      {
        title: 'Kerabat',
        icon: <Users />,
        href: '/customers/relations',
      },
      {
        title: 'Pekerjaan',
        icon: <Briefcase />,
        href: '/customers/customerjobs',
      },
      {
        title: 'Pendidikan',
        icon: <GraduationCap />,
        href: '/customers/degrees',
      },
      {
        title: 'Pengeluaran',
        icon: <CreditCard />,
        href: '/customers/expenses',
      },
      {
        title: 'Penghasilan',
        icon: <Wallet />,
        href: '/customers/incomes',
      },
      {
        title: 'Hobi',
        icon: <Camera />,
        href: '/customers/hobbies',
      },
      {
        title: 'Status Rumah',
        icon: <House />,
        href: '/customers/houseownerships',
      },
    ],
  },

  {
    title: 'Follow Up',
    icon: <Phone />,
    isParent: true,
    childrens: [
      {
        title: 'Metode FU',
        icon: <MessageSquare />,
        href: '/fumethod',
      },
      {
        title: 'Status FU',
        icon: <Table />,
        href: '/statusfus',
      },
      {
        title: 'Hasil FU',
        icon: <LucideTable2 />,
        href: '/furesult',
      },
      {
        title: 'Detail FU',
        icon: <Logs />,
        href: '/detailfu',
      },
    ],
  },
  {
    title: 'Products',
    icon: <Bike />,
    href: '/productpreferences',
  },
];
