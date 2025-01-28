import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import JotaiProvider from '@/components/providers/jotai';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import ClientOnly from '@/components/ClientOnly';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: {
    template: '%s | Alfa Scorpii CRM',
    default: 'Alfa Scorpii CRM',
  },
  description: 'Alfa Scorpii Customer Relationship Management System',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} w-screen overflow-x-hidden bg-secondary antialiased`}
      >
        <ClientOnly>
          <JotaiProvider>
            <NextTopLoader showSpinner={false} color="#ff4a4a" />
            {children}
            <Toaster />
          </JotaiProvider>
        </ClientOnly>
      </body>
    </html>
  );
};

export default RootLayout;
