'use client';

import * as React from 'react';
import {
  Bot,
  FileText,
  FileSpreadsheet,
  Phone,
  Layers,
  LayoutDashboard,
  User,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { MenuData, MenuItem } from '@/types';
import { checkPermission } from '@/lib/utils';
import { usePermissions } from '@/hooks';
import Logo from './logo';
import { ScrollArea } from './ui/scroll-area';

type Props = {
  user: {
    name: string;
    username: string;
  };
};

export const AppSidebar = ({
  user,
  ...props
}: Props & React.ComponentProps<typeof Sidebar>) => {
  const { permissions } = usePermissions();

  const data: MenuData = {
    menu: [],
    report: [],
    settings: [],
  };

  const salesPermissions = [
    {
      title: 'Follow Up',
      url: '/follow-up',
      permission: 'view_sales_follow_up',
    },
    {
      title: 'Duplicate Data',
      url: '/duplicatedata',
      permission: 'view_sales_duplicate_data',
    },
    {
      title: 'Customers',
      url: '/customers',
      permission: 'view_sales_customer',
    },
  ];

  if (checkPermission('view_sales', permissions)) {
    data.menu?.push({
      title: 'Sales',
      url: '#',
      icon: FileText,
      isActive: true,
      isParent: true,
      label: 'Menu',
      items: salesPermissions.filter((item) =>
        checkPermission(item.permission, permissions)
      ),
    });
  }

  const servicePermissions = [
    {
      title: 'Follow Up',
      url: '#',
      permission: 'view_service_follow_up',
    },
    {
      title: 'Duplicate Data',
      url: '#',
      permission: 'view_service_duplicate_data',
    },
    {
      title: 'Customers',
      url: '#',
      permission: 'view_service_customer',
    },
  ];

  if (checkPermission('view_service', permissions)) {
    data.menu?.push({
      title: 'Service',
      url: '#',
      icon: Bot,
      isActive: true,
      isParent: true,
      label: 'Menu',
      items: servicePermissions.filter((item) =>
        checkPermission(item.permission, permissions)
      ),
    });
  }

  const prospekPermissions = [
    {
      title: 'Follow Up',
      url: '#',
      permission: 'view_prospek_follow_up',
    },
    {
      title: 'Duplicate Data',
      url: '#',
      permission: 'view_prospek_duplicate_data',
    },
    {
      title: 'Customers',
      url: '#',
      permission: 'view_prospek_customer',
    },
  ];

  if (checkPermission('view_prospek', permissions)) {
    data.menu?.push({
      title: 'Prospek',
      url: '#',
      icon: Phone,
      isActive: true,
      isParent: true,
      label: 'Menu',
      items: prospekPermissions.filter((item) =>
        checkPermission(item.permission, permissions)
      ),
    });
  }

  const reportPermissions = [
    {
      title: 'Deal',
      url: '/deal',
      permission: 'view_report_deal',
    },
  ];

  if (checkPermission('view_report', permissions)) {
    data.report?.push({
      title: 'Report',
      url: '#',
      icon: FileSpreadsheet,
      isActive: true,
      isParent: true,
      label: 'Report',
      items: reportPermissions.filter((item) =>
        checkPermission(item.permission, permissions)
      ),
    });
  }

  const masterDataPermissions = [
    {
      title: 'Dealer',
      url: '/dealers',
      permission: 'view_dealers',
    },
    {
      title: 'Leasing',
      url: '/leasing',
      permission: 'view_leasings',
    },
    {
      title: 'Pekerjaan',
      url: '/customerjobs',
      permission: 'view_jobs',
    },
    {
      title: 'Hari Besar',
      url: '/holidays',
      permission: 'view_holidays',
    },
    {
      title: 'Relasi',
      url: '/relations',
      permission: 'view_relations',
    },
    {
      title: 'Pendidikan',
      url: '/degrees',
      permission: 'view_education_degrees',
    },
    {
      title: 'Pengeluaran',
      url: '/expenses',
      permission: 'view_expenses',
    },
    {
      title: 'Pendapatan',
      url: '/incomes',
      permission: 'view_incomes',
    },
    {
      title: 'Hobi',
      url: '/hobbies',
      permission: 'view_hobbies',
    },
    {
      title: 'Status Rumah',
      url: '/houseownerships',
      permission: 'view_house_ownerships',
    },
    {
      title: 'Sepeda Motor',
      url: '/motorcycles',
      permission: 'view_motorcycles',
    },
    {
      title: 'Warna',
      url: '/colors',
      permission: 'view_colors',
    },
    {
      title: 'Metode Follow Up',
      url: '/fumethod',
      permission: 'view_follow_up_methods',
    },
    {
      title: 'Status Follow Up',
      url: '/statusfus',
      permission: 'view_status_follow_up',
    },
    {
      title: 'Keterangan Follow Up',
      url: '/detailfu',
      permission: 'view_follow_up_details',
    },
    {
      title: 'Hasil Follow Up',
      url: '/furesult',
      permission: 'view_follow_up_results',
    },
    {
      title: 'Tipe Service',
      url: '/servicetypes',
      permission: 'view_service_types',
    },
  ];

  const canViewUser = checkPermission('view_user_list', permissions);

  if (checkPermission('view_master_data', permissions)) {
    data.settings?.push({
      title: 'Master Data',
      url: '#',
      icon: Layers,
      isActive: true,
      isParent: true,
      label: 'Settings',
      items: masterDataPermissions.filter((item) =>
        checkPermission(item.permission, permissions)
      ),
    });
  }

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
          {checkPermission('view_dashboard', permissions) && (
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
          )}
          {(data.menu as MenuItem[]).length > 0 && (
            <NavMain items={data?.menu as MenuItem[]} />
          )}
          {(data.report as MenuItem[]).length > 0 && (
            <NavMain items={data?.report as MenuItem[]} />
          )}
          {canViewUser && (
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/staff">
                    <SidebarMenuButton>
                      <User />
                      <span>List User</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )}
          {(data.settings as MenuItem[]).length > 0 && (
            <NavMain items={data?.settings as MenuItem[]} />
          )}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
