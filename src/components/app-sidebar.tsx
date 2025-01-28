'use client';

import * as React from 'react';
import {
  Bot,
  FileText,
  FileSpreadsheet,
  Layers,
  Users,
  Phone,
  LayoutDashboard,
  ChevronRight,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import Logo from './logo';
import { ScrollArea } from './ui/scroll-area';

export const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  menu: [
    {
      title: 'Sales',
      url: '#',
      icon: FileText,
      isActive: true,
      isParent: true,
      label: 'Menu',
      items: [
        {
          title: 'Follow Up',
          url: '/follow-up',
        },
        {
          title: 'Duplicate Data',
          url: '#',
        },
        {
          title: 'Customers',
          url: '/customers',
        },
      ],
    },
    {
      title: 'Service',
      url: '#',
      icon: Bot,
      isActive: true,
      isParent: true,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Prospek',
      url: '#',
      icon: Phone,
      isParent: true,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
  ],
  report: [
    {
      title: 'Report',
      url: '#',
      icon: FileSpreadsheet,
      isActive: true,
      isParent: true,
      label: 'Report',
      items: [
        {
          title: 'Deal',
          url: '/deal',
        },
        {
          title: 'Staff Activity',
          url: '#',
        },
      ],
    },
  ],
  settings: [
    {
      title: 'User List',
      url: '/staff',
      icon: Users,
    },
    {
      title: 'Master Data',
      url: '#',
      icon: FileSpreadsheet,
      isActive: true,
      isParent: true,
      label: 'Settings',
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
          title: 'Metode Follow Up',
          url: '/fumethod',
        },
        {
          title: 'Status Follow Up',
          url: '/statusfus',
        },
        {
          title: 'Keterangan Follow Up',
          url: '/detailfu',
        },
        {
          title: 'Hasil Follow Up',
          url: '/furesult',
        },
      ],
    },
  ],
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Logo />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Alfa Scorpii</span>
                  <span className="truncate text-xs">CRM</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <NavMain items={data.menu} />
          <NavMain items={data.report} />
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href={data.settings[0].url}>
                  <SidebarMenuButton>
                    <Users />
                    <span>{data.settings[0].title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <Collapsible
                key={data.settings[1].title}
                asChild
                defaultOpen={data.settings[1].isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={data.settings[1].title}>
                      <Layers />
                      <span>Master Data</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {data.settings[1].items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
