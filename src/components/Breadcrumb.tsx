'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

interface IBreadcrumbItem {
  label: string;
  url?: string;
  isParent?: boolean;
  items?: IBreadcrumbItem[];
}

const breadcrumbItems: IBreadcrumbItem[] = [
  {
    label: 'Dashboard',
    url: '/',
  },
  {
    label: 'Sales',
    isParent: true,
    items: [
      {
        label: 'Follow Up',
        url: '/follow-up',
      },
      {
        label: 'Duplicate Data',
        url: '/duplicatedata',
      },
      {
        label: 'Customer',
        url: '/customers',
      },
    ],
  },
  {
    label: 'Report',
    isParent: true,
    items: [
      {
        label: 'Deal',
        url: '/deal',
      },
      {
        label: 'Staff Activity',
        url: '#',
      },
    ],
  },
  {
    label: 'Master Data',
    isParent: true,
    items: [
      {
        label: 'Dealer',
        url: '/dealers',
      },
      {
        label: 'Leasing',
        url: '/leasing',
      },
      {
        label: 'Pekerjaan',
        url: '/customerjobs',
      },
      {
        label: 'Hari Besar',
        url: '/holidays',
      },
      {
        label: 'Relasi',
        url: '/relations',
      },
      {
        label: 'Pendidikan',
        url: '/educations',
      },
      {
        label: 'Pengeluaran',
        url: '/expenses',
      },
      {
        label: 'Pendapatan',
        url: '/incomes',
      },
      {
        label: 'Hobi',
        url: '/hobbies',
      },
      {
        label: 'Status Rumah',
        url: '/houseownerships',
      },
      {
        label: 'Sepeda Motor',
        url: '/motorcycles',
      },
      {
        label: 'Metode Follow Up',
        url: '/fumethod',
      },
      {
        label: 'Status Follow Up',
        url: '/statusfus',
      },
      {
        label: 'Keterangan Follow Up',
        url: '/fudetail',
      },
      {
        label: 'Hasil Follow Up',
        url: '/furesult',
      },
    ],
  },
  {
    label: 'User List',
    url: '/staff',
  },
];

export const BreadcrumbNav = () => {
  const pathname = usePathname();

  const findMatchingItems = (
    items: IBreadcrumbItem[],
    path: string
  ): IBreadcrumbItem[] => {
    return items.reduce<IBreadcrumbItem[]>((acc, item) => {
      if (pathname.startsWith(item.url as string)) {
        return [item];
      }
      if (item.isParent && item.items) {
        const match = findMatchingItems(item.items, path);
        if (match.length > 0) {
          return [item, ...match];
        }
      }
      return acc;
    }, []);
  };

  const matchingItems = findMatchingItems(breadcrumbItems, pathname);

  return (
    <Breadcrumb>
      {matchingItems.map((item, index) => (
        <BreadcrumbItem
          key={item.label}
          className="mr-1 text-sm text-muted-foreground"
        >
          {index === matchingItems.length - 1 ? (
            <BreadcrumbPage className="text-muted-foreground">
              {item.label}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={item.url} className="text-muted-foreground">
              {item.label}
            </BreadcrumbLink>
          )}
          {index < matchingItems.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
