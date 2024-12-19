import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { buttonVariants } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-black bg-[url('/images/404.jpg')] bg-contain bg-right-bottom bg-no-repeat">
      <div className="flex w-max flex-col items-center gap-y-8">
        <h2 className="text-9xl text-white mix-blend-difference">404</h2>
        <p className="font-semibold text-white mix-blend-difference">
          Could not find requested resource
        </p>
        <Link
          href="/"
          className={clsx('w-max', buttonVariants({ variant: 'outline' }))}
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
