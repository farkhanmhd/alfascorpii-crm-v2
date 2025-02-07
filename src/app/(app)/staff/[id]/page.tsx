import React, { Suspense } from 'react';
import AsyncStaffDetail from './AsyncStaffDetail';
import StaffDetailSkeleton from './StaffDetailSkeleton';

const Page = () => {
  return (
    <Suspense fallback={<StaffDetailSkeleton />}>
      <AsyncStaffDetail />
    </Suspense>
  );
};

export default Page;
