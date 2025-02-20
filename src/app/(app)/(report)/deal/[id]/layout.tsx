import React from 'react';
import { Metadata } from 'next';
import { ScrollArea } from '@/components/ui/scrollarea';

export const metadata: Metadata = {
  title: 'Customer',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full w-full">
      <ScrollArea className="h-full rounded-lg">
        <div className="min-h-full rounded-lg bg-background shadow-md">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Layout;
