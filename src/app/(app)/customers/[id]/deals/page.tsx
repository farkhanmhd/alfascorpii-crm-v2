import React from 'react';
import { Separator } from '@/components/ui/separator';
import DealsForm from './deals-form';

const DealsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Deals</h3>
        <p className="text-sm text-muted-foreground">
          Motorcycle Deals and Promotions
        </p>
      </div>
      <Separator />
      <DealsForm />
    </div>
  );
};

export default DealsPage;
