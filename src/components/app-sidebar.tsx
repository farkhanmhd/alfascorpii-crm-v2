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
  Bike,
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
      isActive: true,
      isParent: true,
      items: [
        {
          title: 'Dealers',
          url: '/dealers',
        },
        {
          title: 'Leasings',
          url: '/leasing',
        },
        {
          title: 'Jobs',
          url: '/customerjobs',
        },
        {
          title: 'Holidays',
          url: '/holidays',
        },
        {
          title: 'Relations',
          url: '/relations',
        },
        {
          title: 'Education Degree',
          url: '/degrees',
        },
        {
          title: 'Expenses',
          url: '/expenses',
        },
        {
          title: 'Incomes',
          url: '/incomes',
        },
        {
          title: 'Hobbies',
          url: '/hobbies',
        },
        {
          title: 'House Ownerships',
          url: '/houseownerships',
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
          title: 'Methods',
          url: '/fumethod',
        },
        // {
        //   title: 'Status',
        //   url: '/statusfus',
        // },
        {
          title: 'Results',
          url: '/furesult',
        },
        {
          title: 'Details',
          url: '/detailfu',
        },
      ],
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: Users,
      isParent: false,
    },
    {
      title: 'Products',
      url: '/productpreferences',
      icon: Bike,
      isParent: false,
    },
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
        <NavMain items={sidebarData.navMain} />
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
