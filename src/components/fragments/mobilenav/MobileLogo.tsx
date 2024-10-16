'use client';

import React from 'react';
import clsx from 'clsx';
import useMobileSidenav from '@/hooks/useMobileSidenav';
import LogoIcon from '@/components/Icon/LogoIcon';

const MobileLogo = () => {
  const { mobileSidenav } = useMobileSidenav();
  return (
    <div
      className={clsx('flex items-center justify-center space-x-4', {
        'pl-6': mobileSidenav,
      })}
    >
      <LogoIcon />
      {mobileSidenav && (
        <span className="w-max text-xl font-semibold text-black dark:text-white">
          Alfa Scorpii CRM
        </span>
      )}
    </div>
  );
};

export default MobileLogo;
