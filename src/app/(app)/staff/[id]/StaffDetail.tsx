'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Key, Shield, UserX } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
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
import { Staff } from '@/types';

interface StaffDetailProps {
  profile: Staff;
}

const StaffDetail: React.FC<StaffDetailProps> = ({ profile }) => {
  console.log(profile);
  const { back } = useRouter();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    profile.permissions
  );
  const [open, setOpen] = useState<boolean>(false);

  const togglePermission = (permissionValue: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionValue)
        ? prev.filter((p) => p !== permissionValue)
        : [...prev, permissionValue]
    );
  };

  return (
    <div className="rounded-md bg-background p-6">
      <Button variant="ghost" className="mb-4" onClick={() => back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="mt-6 grid gap-4">
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt={profile.user.name} />
                <AvatarFallback>
                  {profile.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{profile.user.name}</h2>
                <p className="text-muted-foreground">
                  {profile.roles.join(', ')}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <Label className="font-medium">Username</Label>
                <span>{profile.user.username}</span>
              </div>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <Label className="font-medium">Status</Label>
                <span>{profile.user.status}</span>
              </div>
              <Separator className="my-2" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 lg:flex-row lg:justify-between">
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full lg:w-auto">
                  <Key className="mr-2 h-4 w-4" /> Reset Password
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Password</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to reset the user&apos;s password?
                    This action cannot be undone.
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

            <Button variant="destructive" className="w-full lg:w-auto">
              <UserX className="mr-2 h-4 w-4" /> Deactivate
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>User Permissions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6">
            {profile.permissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={permission}
                  checked={selectedPermissions.includes(permission)}
                  onCheckedChange={() => togglePermission(permission)}
                />
                <Label htmlFor={permission}>{permission}</Label>
              </div>
            ))}
          </CardContent>
          <CardFooter className="mt-auto">
            <Button variant="blue">
              <Shield className="mr-2 h-4 w-4" /> Update Permissions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StaffDetail;
