import React, { Suspense } from 'react';
import AsyncStaffDetail from './AsyncStaffDetail';
import StaffDetailSkeleton from './StaffDetailSkeleton';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <Suspense fallback={<StaffDetailSkeleton />}>
      <AsyncStaffDetail id={id} />
    </Suspense>
  );
};

export default Page;
