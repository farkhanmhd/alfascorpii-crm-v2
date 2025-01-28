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

// Mock user data
const user = {
  image: '/placeholder.svg',
  nip: '123456789',
  username: 'johndoe',
  name: 'John Doe',
  phone: '+62 812 3456 7890',
  position: 'Sales Manager',
  jobDetail: 'Responsible for overseeing sales operations',
  division: 'Sales',
  dealerArea: 'Jakarta',
};

// Updated mock permissions data
const permissions = [
  {
    category: 'User Management (Select All)',
    items: [
      { label: 'Create User', value: 'create_user' },
      { label: 'Edit User', value: 'edit_user' },
      { label: 'Delete User', value: 'delete_user' },
      { label: 'View User', value: 'view_user' },
    ],
  },
  {
    category: 'Product Management (Select All)',
    items: [
      { label: 'Create Product', value: 'create_product' },
      { label: 'Edit Product', value: 'edit_product' },
      { label: 'Delete Product', value: 'delete_product' },
      { label: 'View Product', value: 'view_product' },
    ],
  },
  {
    category: 'Order Management (Select All)',
    items: [
      { label: 'Create Order', value: 'create_order' },
      { label: 'Edit Order', value: 'edit_order' },
      { label: 'Delete Order', value: 'delete_order' },
      { label: 'View Order', value: 'view_order' },
    ],
  },
];

const UserDetailPage = () => {
  const { back } = useRouter();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (permissionValue: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionValue)
        ? prev.filter((p) => p !== permissionValue)
        : [...prev, permissionValue]
    );
  };

  const toggleCategory = (category: string) => {
    const categoryPermissions =
      permissions
        .find((p) => p.category === category)
        ?.items.map((item) => item.value) || [];

    const allSelected = categoryPermissions.every((p) =>
      selectedPermissions.includes(p)
    );

    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((p) => !categoryPermissions.includes(p))
      );
    } else {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...categoryPermissions]),
      ]);
    }
  };

  return (
    <div className="h-full rounded-md bg-background p-6">
      <Button variant="ghost" className="mb-4" onClick={() => back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="mt-6 grid gap-4">
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.position}</p>
              </div>
            </div>
            <div className="grid gap-2">
              {Object.entries(user).map(
                ([key, value]) =>
                  key !== 'image' &&
                  key !== 'name' &&
                  key !== 'position' && (
                    <div key={key}>
                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        <Label className="font-medium">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Label>
                        <span>{value}</span>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  )
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 lg:flex-row lg:justify-between">
            <Button variant="outline" className="w-full lg:w-auto">
              <Key className="mr-2 h-4 w-4" /> Reset Password
            </Button>
            <Button variant="destructive" className="w-full lg:w-auto">
              <UserX className="mr-2 h-4 w-4" /> Deactivate
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>User Permissions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {permissions.map((category) => (
              <div key={category.category}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.category}
                    checked={category.items.every((item) =>
                      selectedPermissions.includes(item.value)
                    )}
                    onCheckedChange={() => toggleCategory(category.category)}
                  />
                  <Label htmlFor={category.category} className="font-medium">
                    {category.category}
                  </Label>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={item.value}
                        checked={selectedPermissions.includes(item.value)}
                        onCheckedChange={() => togglePermission(item.value)}
                      />
                      <Label htmlFor={item.value}>{item.label}</Label>
                    </div>
                  ))}
                </div>
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

export default UserDetailPage;
