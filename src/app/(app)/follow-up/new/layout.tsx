import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scrollarea';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-y-3">
      <header>
        <h1 className="text-xl font-medium">Tambah Follow Up</h1>
      </header>

      <Separator />
      <ScrollArea className="mx-auto mb-6 w-full sm:w-4/6 md:w-3/4 xl:w-1/2">
        {children}
      </ScrollArea>
    </div>
  );
};

export default Layout;
