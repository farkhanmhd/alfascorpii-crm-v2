'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabData } from '@/types';

const CustomTabs: React.FC<{ tabData: TabData<React.ReactNode>[] }> = ({
  tabData,
}) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="h-9 w-full justify-start rounded-none border-b bg-transparent p-0">
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none'
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabData.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-4 rounded-md p-4"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
