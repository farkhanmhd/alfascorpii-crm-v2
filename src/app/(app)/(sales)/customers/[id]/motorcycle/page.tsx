import React from 'react';
import { Separator } from '@/components/ui/separator';
// import MotorcycleForm from './motorcycle-form';

const SettingsAppearancePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Motorcycle</h3>
        <p className="text-sm text-muted-foreground">
          Oversee and maintain accurate records of customer motorcycle details,
          including model, purchase history, and service updates.
        </p>
      </div>
      <Separator />
      {/* <MotorcycleForm /> */}
    </div>
  );
};

export default SettingsAppearancePage;
