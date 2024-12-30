'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { JWTPayload } from 'jose';
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
// import Header from '@/components/fragments/header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import {
  // Link, Home,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';
import { logout } from '../lib/actions/auth';
import { SessionPayload } from '../lib/actions/auth/session';

interface TemplateProviderProps {
  children: React.ReactNode;
  session: JWTPayload | null | SessionPayload;
}

const { navMain } = sidebarData;

const TemplateProvider: React.FC<TemplateProviderProps> = ({
  children,
  session,
}) => {
  const pathname = usePathname();
  const { push } = useRouter();

  const handleLogout = async () => {
    await logout();
    localStorage.setItem('userLogout', 'true');
    push('/login');
  };

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
      <AppSidebar session={session} />
      <SidebarInset className="bg-transparent">
        {/* <header className="flex shrink-0 items-center gap-2 pt-5 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                        <BreadcrumbItem>
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
        </header> */}
        <header className="ml-64 flex items-center justify-between gap-y-2 bg-header px-6 py-3">
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
                      <BreadcrumbItem>
                        <BreadcrumbLink href={col?.url as string}>
                          {col?.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    )}
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                )}
              />
            </BreadcrumbList>
          </Breadcrumb>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className={cn(
                'cursor-pointer',
                buttonVariants({ variant: 'ghost' })
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src="/avatars/shadcn.jpg" alt="AD" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.name as string}
                  </span>
                  <span className="truncate text-xs">
                    {session?.username as string}
                  </span>
                </div>
                <ChevronDown className="ml-auto size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem className="cursor-pointer">
                <User />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <section className="flex-1 px-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TemplateProvider;
