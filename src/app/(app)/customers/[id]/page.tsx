import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';

const SettingsProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Customer Data</h3>
        <p className="text-sm text-muted-foreground">
          Oversee and manage customer personal information, ensuring accuracy
          and privacy.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
};

export default SettingsProfilePage;
