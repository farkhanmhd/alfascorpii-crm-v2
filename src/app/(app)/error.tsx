'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-4 text-center">
        <h1 className="text-3xl font-bold lg:text-5xl">
          Something went wrong!
        </h1>
        <Badge variant="destructive" className="text-xs font-medium sm:text-sm">
          {error.message}
        </Badge>
        <Button className="w-max" variant="outline" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
