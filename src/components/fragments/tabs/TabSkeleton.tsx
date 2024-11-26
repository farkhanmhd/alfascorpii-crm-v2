'use client';

import React from 'react';
import MapItems from '@/utils/MapItems';
import TabLayout from './TabLayout';
import TextInputSkeleton from '../form/TextInputSkeleton';

const TabSkeleton = () => {
  const InputSkeletons = Array.from({ length: 5 }).map((_, index) => (
    <TextInputSkeleton key={index} />
  ));
  return (
    <TabLayout currentValue="overview" value="overview">
      <MapItems
        of={InputSkeletons}
        render={(_, index) => <TextInputSkeleton key={index} />}
      />
    </TabLayout>
  );
};

export default TabSkeleton;
