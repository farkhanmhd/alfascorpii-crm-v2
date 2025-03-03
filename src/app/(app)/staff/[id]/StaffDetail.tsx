'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Key, Shield, UserX, Power } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { Staff } from '@/types';
import { fullPermissionsList } from '@/lib/permissions';
import { permissionGroups } from '@/lib/permissions/groups';
import { usePermissions } from '@/hooks';
import { checkPermission, actionResponseToast, cn } from '@/lib/utils';
import { useAction } from 'next-safe-action/hooks';
import {
  updateUserPermissionAction,
  activateUserAction,
  deactivateUserAction,
} from '@/app/lib/actions/staff';

interface StaffDetailProps {
  profile: Staff;
}

const StaffDetail: React.FC<StaffDetailProps> = ({ profile }) => {
  const { permissions: permissionState } = usePermissions();
  const canUpdatePermission = checkPermission(
    'update_permission',
    permissionState
  );
  const canResetPassword = checkPermission('reset_password', permissionState);
  const canDeactivateUser = checkPermission('deactivate_user', permissionState);
  const canActivateUser = checkPermission('activate_user', permissionState);

  const { back } = useRouter();
  const params = useParams();
  const uuid = params.id; // Assume [id] is the user uuid

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    profile.permissions.map((p) => p.permission_name)
  );
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState<boolean>(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] =
    useState<boolean>(false);

  const togglePermission = (permissionValue: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionValue)
        ? prev.filter((p) => p !== permissionValue)
        : [...prev, permissionValue]
    );
  };

  const isGroupChecked = (permissions: string[]) => {
    return permissions.every((p) => selectedPermissions.includes(p));
  };

  const getAllPermissions = (group: (typeof permissionGroups)[0]): string[] => {
    let perms = [...group.permissions];
    if (group.children) {
      group.children.forEach((child) => {
        perms = [...perms, ...getAllPermissions(child)];
      });
    }
    return perms;
  };

  const toggleGroupPermissions = (group: (typeof permissionGroups)[0]) => {
    const allGroupPermissions = getAllPermissions(group);
    const allChecked = isGroupChecked(group.permissions);
    if (allChecked) {
      setSelectedPermissions((prev) =>
        prev.filter((p) => !allGroupPermissions.includes(p))
      );
    } else {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...allGroupPermissions]),
      ]);
    }
  };

  const renderPermissionGroup = (
    group: (typeof permissionGroups)[0],
    level = 0
  ) => (
    <div key={group.id} className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={group.id}
          checked={isGroupChecked(group.permissions)}
          onCheckedChange={() => toggleGroupPermissions(group)}
        />
        <Label htmlFor={group.id} className="font-medium">
          {group.label}
        </Label>
      </div>
      <div className="ml-6 grid grid-cols-2 gap-2">
        {group.permissions.map((permission) => (
          <div key={permission} className="flex items-center space-x-2">
            <Checkbox
              id={permission}
              checked={selectedPermissions.includes(permission)}
              onCheckedChange={() => togglePermission(permission)}
            />
            <Label htmlFor={permission}>
              {
                fullPermissionsList.find(
                  (p) => p.permission_name === permission
                )?.formatted_value
              }
            </Label>
          </div>
        ))}
      </div>
      {group.children && (
        <div className="ml-6 space-y-2">
          {group.children.map((child) =>
            renderPermissionGroup(child, level + 1)
          )}
        </div>
      )}
    </div>
  );

  // Server action hook for updating permissions
  const { execute, isPending } = useAction(updateUserPermissionAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpenUpdateDialog(false);
    },
  });

  // Server action hooks for Activate and Deactivate
  const { execute: executeActivate, isPending: isPendingActivate } = useAction(
    activateUserAction,
    {
      onSettled: (result) => {
        actionResponseToast(result);
        setActivateDialogOpen(false);
      },
    }
  );

  const { execute: executeDeactivate, isPending: isPendingDeactivate } =
    useAction(deactivateUserAction, {
      onSettled: (result) => {
        actionResponseToast(result);
        setDeactivateDialogOpen(false);
      },
    });

  return (
    <div className="rounded-md bg-background p-6">
      <Button variant="ghost" className="mb-4" onClick={() => back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-0 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Avatar className="h-20 w-20 border-2 border-border shadow-sm">
                  <AvatarImage src="/placeholder.svg" alt={profile.user.name} />
                  <AvatarFallback className="text-xl font-semibold">
                    {profile.user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold">{profile.user.name}</h2>
                  <span
                    className={cn(
                      'mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      {
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400':
                          profile.user.status === 'active',
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400':
                          profile.user.status !== 'active',
                      }
                    )}
                  >
                    {profile.user.status.charAt(0).toUpperCase() +
                      profile.user.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 px-6 py-4">
            <div className="grid gap-3">
              <div className="grid grid-cols-1 gap-2 rounded-lg border p-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Username
                  </Label>
                  <p className="font-medium">{profile.user.username}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Status
                  </Label>
                  <p className="font-medium capitalize">
                    {profile.user.status}
                  </p>
                </div>
                {/* Additional user details could be added here */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-end gap-3 px-6 py-4">
            {profile.user.status === 'active' ? (
              <>
                {canResetPassword && (
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <Key className="mr-2 h-4 w-4" /> Reset Password
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset Password</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to reset the user&apos;s
                          password? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant="ghost">Cancel</Button>
                        </AlertDialogCancel>
                        <Button variant="default" type="submit">
                          Change Password
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {canDeactivateUser && (
                  <AlertDialog
                    open={deactivateDialogOpen}
                    onOpenChange={setDeactivateDialogOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="h-9">
                        <UserX className="mr-2 h-4 w-4" /> Deactivate
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deactivate User</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to deactivate this user?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant="ghost">Cancel</Button>
                        </AlertDialogCancel>
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() =>
                            executeDeactivate({ uuid: uuid as string })
                          }
                          disabled={isPendingDeactivate}
                        >
                          Confirm
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </>
            ) : (
              canActivateUser && (
                <AlertDialog
                  open={activateDialogOpen}
                  onOpenChange={setActivateDialogOpen}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="blue" size="sm" className="h-9">
                      <Power className="mr-2 h-4 w-4" /> Activate
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Activate User</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to activate this user?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <Button variant="ghost">Cancel</Button>
                      </AlertDialogCancel>
                      <Button
                        variant="blue"
                        type="button"
                        onClick={() =>
                          executeActivate({ uuid: uuid as string })
                        }
                        disabled={isPendingActivate}
                      >
                        Confirm
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )
            )}
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>User Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 overflow-auto p-6">
            {permissionGroups.map((group) => renderPermissionGroup(group))}
          </CardContent>
          {canUpdatePermission && (
            <CardFooter className="mt-auto">
              <AlertDialog
                open={openUpdateDialog}
                onOpenChange={setOpenUpdateDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="blue" className="w-full lg:w-auto">
                    <Shield className="mr-2 h-4 w-4" /> Update Permissions
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Update Permissions</AlertDialogTitle>
                    <AlertDialogDescription>
                      Update {selectedPermissions.length} permissions to{' '}
                      {profile.user.username}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="ghost">Cancel</Button>
                    </AlertDialogCancel>
                    <Button
                      variant="default"
                      type="button"
                      onClick={() =>
                        execute({
                          uuid: uuid as string,
                          permissions: selectedPermissions,
                        })
                      }
                      disabled={isPending}
                    >
                      Update
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StaffDetail;
