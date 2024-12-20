'use client';

import React from 'react';
import { JWTPayload } from 'jose';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Database,
  Users,
  Phone,
  LayoutDashboard,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scrollarea';

import SearchButton from './fragments/buttons/SearchButton';
import ThemeToggle from './fragments/toggle/ThemeToggle';

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
        {
          title: 'Sepeda Motor',
          url: '/motorcycles',
        },
      ],
    },

    {
      title: 'Follow Up',
      url: '#',
      icon: Phone,
      isParent: true,
      items: [
        {
          title: 'List Follow Up',
          url: '/follow-up',
        },
        {
          title: 'Data Duplikat',
          url: '/duplicatedata',
        },
      ],
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: Users,
      isParent: false,
    },
    // {
    //   title: 'Products',
    //   url: '/productpreferences',
    //   icon: Bike,
    //   isParent: false,
    // },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: JWTPayload | null;
}

export const AppSidebar = ({ session, ...props }: AppSidebarProps) => {
  const user = session;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <NavMain items={sidebarData.navMain} />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <SearchButton />
        <ThemeToggle />
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
