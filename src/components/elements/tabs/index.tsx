'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabData } from '@/types';
import MapItems from '@/utils/MapItems';

const tabDataAtom = atomWithStorage<string>('tabData', 'overview');

const CustomTabs: React.FC<{ tabData: TabData<React.ReactNode>[] }> = ({
  tabData,
}) => {
  const [selectedTab, setSelectedTab] = useAtom(tabDataAtom);
  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="relative w-full"
    >
      <TabsList className="sticky top-0 z-40 h-auto w-full flex-wrap gap-2 rounded-none border-b border-border bg-background px-0 py-1 text-foreground">
        <MapItems
          of={tabData}
          render={(tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.value}
              className="relative font-semibold after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              {tab.label}
            </TabsTrigger>
          )}
        />
      </TabsList>
      {tabData.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-0 px-6 pt-6"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
