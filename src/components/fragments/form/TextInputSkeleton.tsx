'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const TextInputSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="h-5 w-full max-w-sm" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default TextInputSkeleton;
