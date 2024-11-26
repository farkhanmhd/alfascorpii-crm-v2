import React from 'react';
import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Customer',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="grid max-h-[calc(100dvh-48px)] flex-1 grid-rows-[auto_auto_1fr] gap-y-6 pb-6 lg:px-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customer</h2>
        <p className="hidden text-muted-foreground sm:block">
          Efficiently organize and oversee all aspects of customer information,
          including personal details, contact information, purchase history, and
          communication preferences, to ensure seamless customer relationship
          management and improve service quality.
        </p>
      </div>

      <Separator />

      <div className="flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
