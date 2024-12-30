'use client';

import React from 'react';
import { useActionDialog } from '@/hooks';
import { Button } from '@/components/ui/button';

const FollowUpFooter = () => {
  const { setActionDialog } = useActionDialog();

  const handleImportDialog = () => {
    setActionDialog({ create: true });
  };

  const handleSendToCRO = () => {
    setActionDialog({ open: true });
  };

  return (
    <footer className="flex gap-x-4 pt-6">
      <Button onClick={handleImportDialog} variant="blue">
        Import Data
      </Button>
      <Button onClick={handleSendToCRO}>Send to CRO</Button>
    </footer>
  );
};

export default FollowUpFooter;
