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
import { cn } from '@/lib/utils';
import { logout } from '@/app/lib/actions/auth';
import { SessionPayload } from '@/app/lib/actions/auth/session';

const Header = ({
  headerTitle,
  path,
  user,
}: {
  headerTitle: string;
  path: string;
  user: SessionPayload | null;
}) => {
  const { push } = useRouter();
  const handleLogout = async () => {
    await logout();
    localStorage.setItem('userLogout', 'true');
    push('/login');
  };
  return (
    <header className="ml-72 flex h-[84px] items-center justify-between gap-y-2 bg-header px-[21px] py-[14px]">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold uppercase leading-[20px] text-primary">
          {headerTitle}
        </h1>
        <div className="flex items-center gap-x-3 text-sm leading-[20px]">
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
