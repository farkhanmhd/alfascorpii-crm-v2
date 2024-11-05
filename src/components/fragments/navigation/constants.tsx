import React from 'react';

import {
  LayoutDashboard,
  Database,
  // User,
  Users,
  Building,
  DollarSign,
  // FileChartLineIcon,
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
      {
        title: 'Kerabat',
        icon: <Users />,
        href: '/relations',
      },
      {
        title: 'Pekerjaan',
        icon: <Briefcase />,
        href: '/customerjobs',
      },
      {
        title: 'Pendidikan',
        icon: <GraduationCap />,
        href: '/degrees',
      },
      {
        title: 'Pengeluaran',
        icon: <CreditCard />,
        href: '/expenses',
      },
      {
        title: 'Penghasilan',
        icon: <Wallet />,
        href: '/incomes',
      },
      {
        title: 'Hobi',
        icon: <Camera />,
        href: '/hobbies',
      },
      {
        title: 'Status Rumah',
        icon: <House />,
        href: '/houseownerships',
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
    href: '/customers',
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
        title: 'Keterangan FU',
        icon: <Logs />,
        href: '/keteranganfu',
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
      {
        title: 'Kerabat',
        icon: <Users />,
        href: '/relations',
      },
      {
        title: 'Pekerjaan',
        icon: <Briefcase />,
        href: '/customerjobs',
      },
      {
        title: 'Pendidikan',
        icon: <GraduationCap />,
        href: '/degrees',
      },
      {
        title: 'Pengeluaran',
        icon: <CreditCard />,
        href: '/expenses',
      },
      {
        title: 'Penghasilan',
        icon: <Wallet />,
        href: '/incomes',
      },
      {
        title: 'Hobi',
        icon: <Camera />,
        href: '/hobbies',
      },
      {
        title: 'Status Rumah',
        icon: <House />,
        href: '/houseownerships',
      },
    ],
  },
  {
    title: 'Customers',
    icon: <Users />,
    href: '/customers',
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
        title: 'Keterangan FU',
        icon: <Logs />,
        href: '/keteranganfu',
      },
    ],
  },
  {
    title: 'Products',
    icon: <Bike />,
    href: '/productpreferences',
  },
];
