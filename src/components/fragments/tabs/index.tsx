'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabData } from '@/types';
import MapItems from '@/utils/MapItems';

const CustomTabs: React.FC<{ tabData: TabData<React.ReactNode>[] }> = ({
  tabData,
}) => {
  return (
    <Tabs defaultValue="overview" className="relative w-full">
      <TabsList className="sticky top-0 z-50 h-auto w-full gap-2 rounded-none border-b border-border bg-background px-0 py-1 text-foreground">
        <MapItems
          of={tabData}
          render={(tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.value}
              className="relative font-bold after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              {tab.label}
            </TabsTrigger>
          )}
        />
      </TabsList>
      {tabData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
