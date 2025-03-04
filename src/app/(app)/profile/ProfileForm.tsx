'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for back navigation
import { useAction } from 'next-safe-action/hooks';
import { changePasswordAction } from '@/app/lib/actions/profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import TextInput from '@/components/elements/form/TextInput';
import { SelectOptions } from '@/types';
import MapItems from '@/utils/MapItems';
import { actionResponseToast, getErrorMessages } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react'; // Icon for the back button

interface TextInputProps extends SelectOptions {
  id: string;
}

const ProfileForm = () => {
  const router = useRouter(); // Initialize useRouter for navigation
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);

  const initialformData: TextInputProps[] = [
    { value: '', label: 'NIP', id: 'nip' },
    { value: '', label: 'Nama', id: 'name' },
    { value: '', label: 'Jabatan', id: 'jabatan' },
    { value: '', label: 'Bagian', id: 'bagian' },
    { value: '', label: 'Username', id: 'username' },
    { value: '', label: 'Ponsel', id: 'ponsel' },
    { value: '', label: 'Detail Jabatan', id: 'detail_jabatan' },
    { value: '', label: 'Area Dealer', id: 'area_dealer' },
  ];
  const [form, setForm] = useState<TextInputProps[]>(initialformData);

  const handleEditToggle = () => setIsEditing((prev) => !prev);
  const handleCancel = () => {
    setIsEditing(false);
    setForm(initialformData);
  };

  const { execute, isPending, result } = useAction(
    async (formData) => {
      const data = {
        old_password: formData.get('old_password'),
        new_password: formData.get('new_password'),
        confirm_password: formData.get('confirm_password'),
      };
      return changePasswordAction(data);
    },
    {
      onSettled: (actionResult) => {
        if (actionResult?.result?.data?.status === 'success') {
          actionResponseToast(actionResult);
          setShowChangePasswordDialog(false);
        } else {
          actionResponseToast(actionResult);
        }
      },
    }
  );

  return (
    <div className="mx-auto w-full max-w-5xl sm:w-11/12">
      <Card>
        <CardContent className="p-6">
          <Button
            variant="ghost"
            className="mb-4 flex items-center"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="mb-6 flex flex-col justify-center md:flex-row">
            <div className="mb-4 flex items-center justify-center md:mb-0">
              <div className="mr-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="/avatars/shadcn.jpg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <MapItems
              of={form}
              render={(data, index) => (
                <TextInput
                  key={index}
                  label={data.label}
                  id={data.id}
                  value={data.value}
                  disabled={!isEditing}
                  placeholder={data.label}
                  onChange={(e) => {
                    setForm((prev) => {
                      return prev.map((item) => {
                        if (item.id === data.id) {
                          return { ...item, value: e.target.value };
                        }
                        return item;
                      });
                    });
                  }}
                />
              )}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button variant="ghost" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="default" onClick={() => setIsEditing(false)}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <AlertDialog
                  open={showChangePasswordDialog}
                  onOpenChange={setShowChangePasswordDialog}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Change Password</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <form className="space-y-4" action={execute}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Change Password</AlertDialogTitle>
                        <AlertDialogDescription>
                          Please enter your old and new password to change your
                          password.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <TextInput
                        label="Old Password"
                        id="old_password"
                        type="password"
                        placeholder="Old Password"
                        error={getErrorMessages(
                          result?.validationErrors?.old_password
                        )}
                      />
                      <TextInput
                        label="New Password"
                        id="new_password"
                        type="password"
                        placeholder="Old Password"
                        error={getErrorMessages(
                          result?.validationErrors?.new_password
                        )}
                      />
                      <TextInput
                        label="Confirm New Password"
                        id="confirm_password"
                        type="password"
                        placeholder="Old Password"
                        error={getErrorMessages(
                          result?.validationErrors?.confirm_password
                        )}
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant="ghost" disabled={isPending}>
                            Cancel
                          </Button>
                        </AlertDialogCancel>
                        <Button
                          variant="default"
                          type="submit"
                          disabled={isPending}
                        >
                          Change Password
                        </Button>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="default" onClick={handleEditToggle}>
                  Change Profile
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
