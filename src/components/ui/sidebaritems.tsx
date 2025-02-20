'use client';

import React from 'react';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { FileSpreadsheet } from 'lucide-react';
import { MenuData } from '@/types';

const routePermissionMap: Record<string, string | string[]> = {
  // master data
  '/dealers': ['view_master_data', 'view_dealers'],
  '/leasing': ['view_master_data', 'view_leasings'],
  '/customerjobs': ['view_master_data', 'view_jobs'],
  '/holidays': ['view_master_data', 'view_holidays'],
  '/relations': ['view_master_data', 'view_relations'],
  '/degrees': ['view_master_data', 'view_education_degrees'],
  '/expenses': ['view_master_data', 'view_expenses'],
  '/incomes': ['view_master_data', 'view_incomes'],
  '/hobbies': ['view_master_data', 'view_hobbies'],
  '/houseownerships': ['view_master_data', 'view_house_ownerships'],
  '/motorcycles': ['view_master_data', 'view_motorcycles'],
  '/colors': ['view_master_data', 'view_colors'],
  '/fumethod': ['view_master_data', 'view_follow_up_methods'],
  '/statusfus': ['view_master_data', 'view_status_follow_up'],
  '/detailfu': ['view_master_data', 'view_follow_up_details'],
  '/furesult': ['view_master_data', 'view_follow_up_results'],
};

const SidebarItem = () => {
  const { permissions } = usePermissions();
  const renderedPermission: MenuData = {
    menu: [],
    report: [],
    settings: [],
  };

  if (checkPermission('view_service', permissions)) {
    const serviceItems = Object.entries(routePermissionMap).filter(
      ([, perms]) => {
        return Array.isArray(perms);
      }
    );
  }

  if (checkPermission('view_master_data', permissions)) {
    const masterDataItems = Object.entries(routePermissionMap)
      .filter(([, perms]) => {
        return Array.isArray(perms)
          ? perms.every((perm) => checkPermission(perm, permissions))
          : checkPermission(perms, permissions);
      })
      .map(([route]) => ({
        title: capitalize(route.split('/').slice(-1)[0]),
        url: route,
      }));

    if (masterDataItems.length > 0) {
      renderedPermission?.settings?.push({
        title: 'Master Data',
        url: '#',
        icon: FileSpreadsheet,
        isActive: true,
        isParent: true,
        label: 'Settings',
        items: masterDataItems,
      });
    }
  }

  return (
    <>
      <pre>{JSON.stringify(renderedPermission, null, 2)}</pre>
      <pre>{JSON.stringify(permissions, null, 2)}</pre>
    </>
  );
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default SidebarItem;
