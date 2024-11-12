'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Link } from 'next-view-transitions';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths =
    pathname === '/'
      ? ['dashboard']
      : pathname.split('/').filter((path) => path !== '');

  const createBreadcrumbPath = (index: number) => {
    return `/${paths.slice(0, index + 1).join('/')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {paths.map((path, i) => (
        <div key={i} className="flex items-center space-x-2 capitalize">
          {i !== paths.length - 1 ? (
            <Link
              href={createBreadcrumbPath(i)}
              className="font-medium capitalize text-primary duration-300"
            >
              {path}
            </Link>
          ) : (
            <span className="font-medium">{path}</span>
          )}

          <ChevronRight className={i === paths.length - 1 ? 'hidden' : ''} />
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
