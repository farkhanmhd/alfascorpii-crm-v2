import React from 'react';
import LogoIcon from '@/components/Icon/LogoIcon';

const Logo = () => {
  return (
    <div className="flex items-center gap-12">
      <LogoIcon />
      <span className="text-xl font-semibold text-black dark:text-white">
        Alfa Scorpii CRM
      </span>
    </div>
  );
};

export default Logo;
