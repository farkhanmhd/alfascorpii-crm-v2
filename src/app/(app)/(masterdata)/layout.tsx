'use client';

import React from 'react';

const MasterDataLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full max-h-[calc(100dvh-48px)] grid-rows-[auto_1fr_auto] gap-y-6">
      {children}
    </div>
  );
};

export default MasterDataLayout;
