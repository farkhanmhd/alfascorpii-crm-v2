import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Tablesearch = () => {
  return (
    <div className="flex items-center justify-between bg-background pb-6">
      <Input placeholder="Filter emails.." className="max-w-sm" />
      <Button variant="outline">Columns</Button>
    </div>
  );
};

export default Tablesearch;
