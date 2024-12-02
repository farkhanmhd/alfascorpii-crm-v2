'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button variant="outline" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};

export default Error;
