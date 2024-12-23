import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import JotaiProvider from '@/components/providers/jotai';
import ThemeProvider from '@/components/providers/theme-provider';
import SearchDialog from '@/components/fragments/searchDialog';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import ClientOnly from '@/components/ClientOnly';
// import { ViewTransitions } from 'next-view-transitions';

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
    // <ViewTransitions>
    <html lang="en">
      <body
        className={`${GeistSans.className} w-screen overflow-hidden bg-background antialiased backdrop-blur-md dark:bg-background`}
      >
        <JotaiProvider>
          <ClientOnly>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader showSpinner={false} />
              <SearchDialog />
              {children}
              <Toaster />
            </ThemeProvider>
          </ClientOnly>
        </JotaiProvider>
      </body>
    </html>
    // </ViewTransitions>
  );
};

export default RootLayout;
