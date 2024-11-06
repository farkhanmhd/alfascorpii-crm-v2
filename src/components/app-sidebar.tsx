'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Database,
  Users,
  Phone,
  Bike,
  Search,
  Moon,
  Sun,
  MonitorCog,
} from 'lucide-react';

import { useSession } from 'next-auth/react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
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
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
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
      title: 'Master Data',
      url: '#',
      icon: Database,
      isActive: true,
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
          title: 'Metode FU',
          url: '/fumethod',
        },
        {
          title: 'Status FU',
          url: '/statusfus',
        },
        {
          title: 'Hasil FU',
          url: '/furesult',
        },
        {
          title: 'Keterangan FU',
          url: '/keteranganfu',
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name,
    username: session?.user?.username,
  };
  console.log(session);
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
}
