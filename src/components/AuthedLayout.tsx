'use client';

import React, { useEffect } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BreadcrumbNav } from '@/components/Breadcrumb';
import { Permission } from '@/lib/permissions';
import { usePermissions } from '@/hooks';
import { ScrollArea } from './ui/scroll-area';

const AuthedLayout = ({
  children,
  permissions,
  user,
}: {
  children: React.ReactNode;
  permissions: Permission[];
  user: { name: string; username: string; role: string };
}) => {
  const { setPermissions } = usePermissions();
  useEffect(() => {
    setPermissions(permissions);
  }, [permissions]);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
        </header>
        <div>
          <ScrollArea className="flex h-[calc(100dvh-48px)] flex-1 flex-col gap-4 bg-secondary">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthedLayout;
