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
} from 'lucide-react';
import { type NavItem } from '@/types';

export const NavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard />,
    href: '/',
  },
  {
    title: 'Staff',
    icon: <User />,
    href: '/staff',
  },
  {
    title: 'Customers',
    icon: <Users />,
    isParent: true,
    childrens: [
      {
        title: 'Daftar Customer',
        icon: <Users />,
        href: '/customers',
      },
      {
        title: 'Kerabat',
        icon: <Users />,
        href: '/customers/kerabat',
      },
      {
        title: 'Pekerjaan',
        icon: <Briefcase />,
        href: '/customers/pekerjaan',
      },
      {
        title: 'Pendidikan',
        icon: <GraduationCap />,
        href: '/customers/pendidikan',
      },
      {
        title: 'Pengeluaran',
        icon: <CreditCard />,
        href: '/customers/pengeluaran',
      },
      {
        title: 'Penghasilan',
        icon: <Wallet />,
        href: '/customers/penghasilan',
      },
      {
        title: 'Hobi',
        icon: <Camera />,
        href: '/customers/hobi',
      },
      {
        title: 'Status Rumah',
        icon: <House />,
        href: '/customers/status-rumah',
      },
    ],
  },
  {
    title: 'Master Data',
    icon: <Database />,
    isParent: true,
    childrens: [
      {
        title: 'Dealer',
        icon: <Building />,
        href: '/dealer',
      },
      {
        title: 'Leasing',
        icon: <DollarSign />,
        href: '/leasing',
      },
      {
        title: 'Model',
        icon: <FileChartLineIcon />,
        href: '/model',
      },
      {
        title: 'Hari Besar',
        icon: <Calendar />,
        href: '/hari-besar',
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
        href: '/metode-fu',
      },
      {
        title: 'Keterangan FU',
        icon: <Table />,
        href: '/keterangan-fu',
      },
      {
        title: 'Keterangan Hasil',
        icon: <LucideTable2 />,
        href: '/keterangan-hasil',
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
  {
    title: 'Staff',
    icon: <User />,
    href: '/staff',
  },
  {
    title: 'Customers',
    icon: <Users />,
    href: '/customers',
    isParent: true,
    childrens: [
      {
        title: 'Kerabat',
        icon: <Users />,
        href: '/customers/kerabat',
      },
      {
        title: 'Pekerjaan',
        icon: <Briefcase />,
        href: '/customers/pekerjaan',
      },
      {
        title: 'Pendidikan',
        icon: <GraduationCap />,
        href: '/customers/pendidikan',
      },
      {
        title: 'Pengeluaran',
        icon: <CreditCard />,
        href: '/customers/pengeluaran',
      },
      {
        title: 'Penghasilan',
        icon: <Wallet />,
        href: '/customers/penghasilan',
      },
      {
        title: 'Hobi',
        icon: <Camera />,
        href: '/customers/hobi',
      },
      {
        title: 'Status Rumah',
        icon: <House />,
        href: '/customers/status-rumah',
      },
    ],
  },
  {
    title: 'Master Data',
    icon: <Database />,
    isParent: true,
    childrens: [
      {
        title: 'Dealer',
        icon: <Building />,
        href: '/dealer',
      },
      {
        title: 'Leasing',
        icon: <DollarSign />,
        href: '/leasing',
      },
      {
        title: 'Model',
        icon: <FileChartLineIcon />,
        href: '/model',
      },
      {
        title: 'Hari Besar',
        icon: <Calendar />,
        href: '/hari-besar',
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
        href: '/metode-fu',
      },
      {
        title: 'Keterangan FU',
        icon: <Table />,
        href: '/keterangan-fu',
      },
      {
        title: 'Keterangan Hasil',
        icon: <LucideTable2 />,
        href: '/keterangan-hasil',
      },
    ],
  },
];
