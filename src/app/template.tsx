'use client';

import React from 'react';
import ClientOnly from '@/components/ClientOnly';

const Template = ({ children }: { children: React.ReactNode }) => {
  return <ClientOnly>{children}</ClientOnly>;
};

export default Template;
