import React, { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';
import TabSkeleton from '@/components/fragments/tabs/TabSkeleton';
import ProfileTab from './profile-tab';

type Params = Promise<{ id: string }>;

const CustomerPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Customer Data</h3>
        <p className="text-sm text-muted-foreground">
          Oversee and manage customer personal information, ensuring accuracy
          and privacy.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<TabSkeleton />}>
        <ProfileTab id={id} />
      </Suspense>
    </div>
  );
};

export default CustomerPage;
