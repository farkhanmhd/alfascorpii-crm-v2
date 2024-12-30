import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import JotaiProvider from '@/components/providers/jotai';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import ClientOnly from '@/components/ClientOnly';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});

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
        className={`${poppins.className} w-screen overflow-x-hidden antialiased`}
      >
        <ClientOnly>
          <JotaiProvider>
            <NextTopLoader showSpinner={false} color="#FF4A4A" />
            {children}
            <Toaster />
          </JotaiProvider>
        </ClientOnly>
      </body>
    </html>
  );
};

export default RootLayout;
