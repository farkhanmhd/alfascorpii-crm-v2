'use client';

import React from 'react';
import clsx from 'clsx';
import useSidebarDesktop from '@/hooks/useSidebarDesktop';
import LogoIcon from '@/components/Icon/LogoIcon';

const Logo = () => {
  const { sidebarOpen } = useSidebarDesktop();
  return (
    <div
      className={clsx('flex items-center justify-center space-x-4', {
        'pl-6': sidebarOpen,
      })}
    >
      <LogoIcon />
      {sidebarOpen && (
        <span className="w-max text-xl font-semibold text-black dark:text-white">
          Alfa Scorpii CRM
        </span>
      )}
    </div>
  );
};

export default Logo;
