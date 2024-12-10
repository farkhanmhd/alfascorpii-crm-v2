import React from 'react';
import { Metadata } from 'next';
import LogoIcon from '@/components/Icon/LogoIcon';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to Alfa Scorpii CRM',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh] w-screen">
      <div className="relative grid h-full w-full flex-col items-center justify-center lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
          <div className="absolute left-0 top-0 h-full w-full">
            <Image
              src="/images/login-bg.jpg"
              alt="login-bg"
              width={600}
              height={900}
              className="h-full w-full"
            />
          </div>
          <div className="relative z-20 flex w-max items-center gap-x-4 text-lg font-medium">
            <LogoIcon />
            Alfa Scorpii
          </div>
          <div className="relative z-20 mt-auto">
            <footer className="text-sm">
              &copy; 2024 by Alfa Scorpii IT Division. All rights reserved.
            </footer>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to Alfa Scorpii CRM
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your username and password below
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
