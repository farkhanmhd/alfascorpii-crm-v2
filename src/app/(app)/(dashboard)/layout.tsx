import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full max-h-[calc(100dvh-48px)] flex-col">
      {children}
    </div>
  );
};

export default DashboardLayout;
