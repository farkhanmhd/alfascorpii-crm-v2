'use client';

import React from 'react';
import clsx from 'clsx';
import LogoIcon from '@/components/Icon/LogoIcon';
import { useSidebarDesktop } from '@/hooks';

type LogoProps = {
  isMobile?: boolean; // Indicates whether it's a mobile logo
};

const LogoBase: React.FC<LogoProps> = ({ isMobile }) => {
  const { sidebarOpen } = useSidebarDesktop();

  return (
    <div
      className={clsx('flex items-center justify-center space-x-4', {
        'pl-6': isMobile ? sidebarOpen : sidebarOpen,
      })}
    >
      <LogoIcon />
      {(isMobile ? sidebarOpen : sidebarOpen) && (
        <span className="w-max text-xl font-semibold text-black dark:text-white">
          Alfa Scorpii CRM
        </span>
      )}
    </div>
  );
};

const Logo = () => <LogoBase />;
const MobileLogo = () => <LogoBase isMobile />;

export { Logo, MobileLogo };
