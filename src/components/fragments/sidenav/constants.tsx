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
        title: 'Staff',
        icon: <User />,
        href: '/staff',
      },
      {
        title: 'Kerabat',
        icon: <Users />,
        href: '/kerabat',
      },
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
      {
        title: 'Pekerjaan',
        icon: <Briefcase />,
        href: '/pekerjaan',
      },
      {
        title: 'Pendidikan',
        icon: <GraduationCap />,
        href: '/pendidikan',
      },
      {
        title: 'Pengeluaran',
        icon: <CreditCard />,
        href: '/pengeluaran',
      },
      {
        title: 'Penghasilan',
        icon: <Wallet />,
        href: '/penghasilan',
      },
      {
        title: 'Hobi',
        icon: <Camera />,
        href: '/hobi',
      },
      {
        title: 'Status Rumah',
        icon: <House />,
        href: '/status-rumah',
      },
    ],
  },
  {
    title: 'Customers',
    icon: <Users />,
    href: '/customers',
  },
];
