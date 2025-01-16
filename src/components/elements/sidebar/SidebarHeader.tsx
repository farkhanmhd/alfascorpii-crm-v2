import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});

const SidebarHeader = () => {
  return (
    <Link
      href="/"
      className="m-2 flex flex-col items-center gap-x-2 rounded-sm py-4 font-light duration-200"
    >
      <Logo />
      <p
        className={`text-xl font-bold leading-loose text-primary ${poppins.className}`}
      >
        CRM
      </p>
    </Link>
  );
};

export default SidebarHeader;
