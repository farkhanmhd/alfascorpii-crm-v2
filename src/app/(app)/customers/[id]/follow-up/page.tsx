import React from 'react';
import { Separator } from '@/components/ui/separator';
import FollowUpList from './FollowUpList';

const FollowUpPage = () => {
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-y-8">
      <div>
        <h3 className="text-lg font-medium">Follow Up</h3>
        <p className="text-sm text-muted-foreground">
          List of Customer Follow Up
        </p>
      </div>

      <Separator />

      <div className="grid grid-rows-[auto_1fr_auto] gap-y-8">
        <FollowUpList />
      </div>
    </div>
  );
};

export default FollowUpPage;
