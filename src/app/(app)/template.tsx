'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar, sidebarData } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import MapItems from '@/utils/MapItems';

const { navMain } = sidebarData;

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const breadcrumbs = navMain
    .map((item) => {
      if (item.isParent && item.items) {
        const subItem = item.items.find((sub) => pathname.startsWith(sub.url));
        if (subItem) {
          return [
            { title: item.title, url: null, isParent: true },
            { title: subItem.title, url: subItem.url, isParent: false },
          ];
        }
      } else if (!item.isParent && pathname === item.url) {
        return [{ title: item.title, url: item.url, isParent: false }];
      }
      return null;
    })
    .filter(Boolean)
    .flat();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <MapItems
                  of={breadcrumbs}
                  render={(col, index) => (
                    <React.Fragment key={index}>
                      {col?.isParent ? (
                        <BreadcrumbItem>{col?.title}</BreadcrumbItem>
                      ) : (
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href={col?.url as string}>
                            {col?.title}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      )}
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  )}
                />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <section className="h-full px-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainTemplate;
