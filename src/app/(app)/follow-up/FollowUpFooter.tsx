'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import { Button } from '@/components/ui/button';

const FollowUpFooter = () => {
  const { setActionDialog } = useActionDialog();

  const handleActionDialog = () => {
    setActionDialog({ create: true });
  };
  return (
    <footer className="flex gap-x-4 pt-6">
      <Button onClick={handleActionDialog} variant="blue">
        Import Data
      </Button>
      <Button>Send to CRO</Button>
    </footer>
  );
};

export default FollowUpFooter;
