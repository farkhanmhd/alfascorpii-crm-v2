'use client';

import React from 'react';
// import { JWTPayload } from 'jose';
import Link from 'next/link';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Database,
  Users,
  LayoutDashboard,
  Import,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  // SidebarMenu,
  // SidebarMenuItem,
  // SidebarMenuButton,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scrollarea';

// import SearchButton from './fragments/buttons/SearchButton';
// import ThemeToggle from './fragments/toggle/ThemeToggle';
import Logo from './logo';

export const sidebarData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Alfa Scorpii',
      logo: GalleryVerticalEnd,
      plan: 'CRM',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isParent: false,
    },
    {
      title: 'Master Data',
      url: '#',
      icon: Database,
      isParent: true,
      items: [
        {
          title: 'Dealer',
          url: '/dealers',
        },
        {
          title: 'Leasing',
          url: '/leasing',
        },
        {
          title: 'Pekerjaan',
          url: '/customerjobs',
        },
        {
          title: 'Hari Besar',
          url: '/holidays',
        },
        {
          title: 'Relasi',
          url: '/relations',
        },
        {
          title: 'Pendidikan',
          url: '/degrees',
        },
        {
          title: 'Pengeluaran',
          url: '/expenses',
        },
        {
          title: 'Pendapatan',
          url: '/incomes',
        },
        {
          title: 'Hobi',
          url: '/hobbies',
        },
        {
          title: 'Status Rumah',
          url: '/houseownerships',
        },
        {
          title: 'Sepeda Motor',
          url: '/motorcycles',
        },
        {
          title: 'Follow Up',
          url: '/follow-up',
        },
        {
          title: 'Metode Follow Up',
          url: '/fumethod',
        },
        {
          title: 'Status Follow Up',
          url: '/statusfus',
        },
        // {
        //   title: 'Hasil Follow Up',
        //   url: '/furesult',
        // },
        {
          title: 'Detail Follow Up',
          url: '/detailfu',
        },
      ],
    },

    {
      title: 'Import Follow Up',
      url: '/follow-up',
      icon: Import,
      isParent: false,
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: Users,
      isParent: false,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export const AppSidebar = ({ ...props }: AppSidebarProps) => {
  // const user = session;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          href="/"
          className="m-2 flex flex-col items-center rounded-sm py-4 duration-200"
        >
          <Logo />
          <p className="text-xl">
            <span className="text-primary">CRM</span> Team
          </p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <NavMain items={sidebarData.navMain} />
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
