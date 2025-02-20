import React, { Suspense } from 'react';
import TabSkeleton from '@/components/elements/tabs/TabSkeleton';
import ProfileTab from './profile-tab';

type Params = Promise<{ id: string }>;

const CustomerPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div className="space-y-3">
      <Suspense fallback={<TabSkeleton />}>
        <ProfileTab id={id} />
      </Suspense>
    </div>
  );
};

export default CustomerPage;
