'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabData } from '@/types';

const CustomTabs: React.FC<{ tabData: TabData<React.ReactNode>[] }> = ({
  tabData,
}) => {
  return (
    <Tabs
      defaultValue="overview"
      className="hide-scrollbar h-full w-full overflow-auto"
    >
      <TabsList className="sticky top-0 z-10 h-9 w-full justify-start rounded-none border-b bg-background p-0">
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'relative z-[9999] h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none'
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
          className="hide-scrollbar mt-0 h-[calc(100%-36px)] overflow-auto rounded-md p-0"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
