import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import JotaiProvider from '@/components/providers/jotai';
import ThemeProvider from '@/components/providers/theme-provider';
import SearchDialog from '@/components/fragments/searchDialog';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import ClientOnly from '@/components/ClientOnly';
import NextAuthProvider from '@/components/providers/next-auth';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alfa Scorpii CRM',
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
        className={`${inter.className} overflow-hidden bg-background antialiased backdrop-blur-md dark:bg-background`}
      >
        <NextAuthProvider>
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
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
