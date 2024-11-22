import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scrollarea';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid max-h-[calc(100dvh-48px)] flex-1 grid-rows-[auto_auto_1fr] gap-y-6 pb-6 lg:px-10">
      <div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Add Customer</h2>
        <p className="hidden text-muted-foreground sm:block">
          Manage and streamline customer information with ease. Organize
          personal details and contact information to enhance customer
          relationships and deliver exceptional service.
        </p>
      </div>

      <Separator />

      <div className="flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
        <ScrollArea className="flex-1">
          <div className="mx-auto h-full px-2 lg:max-w-4xl">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Layout;
