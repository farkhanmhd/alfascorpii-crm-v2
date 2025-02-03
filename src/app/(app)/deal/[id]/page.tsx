import React, { Suspense } from 'react';
import DealDetailAsync from './DealDetailAsync';
import DealDetailSkeleton from './DealDetailSkeleton';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async (props: Props) => {
  const { id } = await props.params;

  return (
    <Suspense fallback={<DealDetailSkeleton />}>
      <DealDetailAsync id={id} />
    </Suspense>
  );
};

export default Page;
