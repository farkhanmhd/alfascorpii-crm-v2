'use client';

import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BreadcrumbNav } from '@/components/Breadcrumb';
import { ScrollArea } from './ui/scroll-area';

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
        </header>
        <div>
          <ScrollArea className="flex h-[calc(100dvh-48px)] flex-1 flex-col gap-4 bg-secondary p-6">
            {children}
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
