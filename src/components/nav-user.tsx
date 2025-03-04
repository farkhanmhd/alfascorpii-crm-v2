'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronsUpDown, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/lib/actions/auth';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { delay } from '@/lib/utils';

type Props = {
  user: {
    name: string;
    username: string;
  };
};

export const NavUser = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { isMobile } = useSidebar();
  const { push } = useRouter();

  const handleLogout = async () => {
    setIsPending(true);
    await delay(1500);
    await logout();
    localStorage.setItem('userLogout', 'true');
    setIsPending(false);
    setOpen(false);
    push('/login');
  };

  const userInitials = user.name.slice(0, 2).toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog open={open || isPending} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="rounded-lg uppercase">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.username}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <Link href="/profile" className="flex gap-x-2">
                <DropdownMenuItem className="cursor-pointer">
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {/* Use AlertDialog for logout confirmation */}
              <DropdownMenuItem className="cursor-pointer p-0">
                <AlertDialogTrigger asChild>
                  <div className="flex h-full w-full items-center gap-x-2 px-2 py-1.5">
                    <LogOut />
                    Log out
                  </div>
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="mt-4 flex justify-end space-x-2">
              <AlertDialogCancel asChild>
                <Button
                  variant="ghost"
                  className="border-none hover:bg-accent hover:text-accent-foreground"
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={handleLogout}
                  className="btn btn-destructive"
                  disabled={isPending}
                >
                  Log out
                </Button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
