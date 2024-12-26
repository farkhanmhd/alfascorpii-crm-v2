import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo';

const SidebarHeader = () => {
  return (
    <Link
      href="/"
      className="m-2 flex flex-col items-center rounded-sm py-4 duration-200"
    >
      <Logo />
      <p className="text-xl">
        <span className="text-primary">CRM</span> Team
      </p>
    </Link>
  );
};

export default SidebarHeader;
