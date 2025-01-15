import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo';

const SidebarHeader = () => {
  return (
    <Link
      href="/"
      className="m-2 flex flex-col items-center gap-x-2 rounded-sm py-4 font-light duration-200"
    >
      <Logo />
      <p className="text-xl font-normal text-primary">CRM</p>
    </Link>
  );
};

export default SidebarHeader;
