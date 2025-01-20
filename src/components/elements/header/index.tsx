'use client';

import React from 'react';
import Link from 'next/link';
import { User, ChevronDown, Home, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { type User as SessionUser } from 'next-auth';
import { cn } from '@/lib/utils';
import { logout } from '@/app/lib/actions/auth';

const Header = ({
  headerTitle,
  path,
  user,
}: {
  headerTitle: string;
  path: string;
  user: SessionUser;
}) => {
  const { push } = useRouter();
  const handleLogout = async () => {
    localStorage.setItem('userLogout', 'true');
    await logout();
    push('/login');
  };
  return (
    <header className="fixed left-0 top-0 z-40 flex h-[84px] w-full items-center justify-between gap-y-2 bg-header py-[14px] pl-16 pr-8 shadow-lg lg:static lg:px-[21px] lg:shadow-none">
      <div className="flex flex-col gap-y-2 lg:ml-[300px]">
        <h1 className="text-xl font-bold uppercase leading-[20px] text-primary lg:text-3xl">
          {headerTitle}
        </h1>
        <div className="hidden items-center gap-x-3 text-sm leading-[20px] lg:flex">
          <Link href="/">
            <Home />
          </Link>
          <span>/</span>
          <Link className="font-medium uppercase" href={`/${path}`}>
            {headerTitle || 'Dashboard'}
          </Link>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className={cn('cursor-pointer', buttonVariants({ variant: 'ghost' }))}
        >
          <div className="flex items-center justify-between gap-x-4 text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src="/avatars/shadcn.jpg" alt="AD" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name}</span>
              <span className="truncate text-xs">{user?.username}</span>
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
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
