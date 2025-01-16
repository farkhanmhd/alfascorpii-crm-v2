import React from 'react';
import { cn } from '@/lib/utils';

interface TabLayoutProps {
  currentValue: string; // Active tab value
  value: string; // Tab's own value
  children: React.ReactNode;
}

const TabLayout: React.FC<TabLayoutProps> = ({
  currentValue,
  value,
  children,
}) => {
  return (
    <div
      className={cn('mb-8 flex-col gap-y-6', {
        hidden: currentValue !== value, // Hide if not active
        flex: currentValue === value, // Show if active
      })}
    >
      {children}
    </div>
  );
};

export default TabLayout;
