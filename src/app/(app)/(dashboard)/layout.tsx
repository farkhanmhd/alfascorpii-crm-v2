import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-full flex-col">{children}</div>;
};

export default DashboardLayout;
