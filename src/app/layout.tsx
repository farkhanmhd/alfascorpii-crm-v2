import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import GlobalProvider from '@/components/providers/global';
import ThemeProvider from '@/components/providers/theme-provider';
import SearchDialog from '@/components/fragments/searchDialog';

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
        className={`${inter.className} bg-background antialiased backdrop-blur-md dark:bg-background`}
      >
        <GlobalProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SearchDialog />
            {children}
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
