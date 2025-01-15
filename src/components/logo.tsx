import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <Image src="/images/logo/logo.png" width={80} height={40} alt="logo" />
  );
};

export default Logo;
