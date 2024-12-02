import React, { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';
import TabSkeleton from '@/components/fragments/tabs/TabSkeleton';
import MotorcycleData from './motorcycle-data';

type Params = Promise<{ id: string }>;

const CustomerMotorcyclePage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Motorcycle</h3>
        <p className="text-sm text-muted-foreground">
          Oversee and maintain accurate records of customer motorcycle details,
          including model, purchase history, and service updates.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<TabSkeleton />}>
        <MotorcycleData id={id} />
      </Suspense>
    </div>
  );
};

export default CustomerMotorcyclePage;
