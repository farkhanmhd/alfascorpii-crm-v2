import React from 'react';
import useMobileSidenav from '@/hooks/useMobileSidenav';
import NavLink from './NavLink';
import { MobileNavItems } from '../sidenav/constants';
import MobileSearchButton from '../buttons/MobileSearchButton';
import MobileMenuButton from '../buttons/MobileMenuButton';

const MobileNav = () => {
  const { setMobileSidenav } = useMobileSidenav();
  return (
    <div className="h-[80px] border-t px-12">
      <nav className="h-full">
        <ul className="flex h-full items-center justify-between">
          {MobileNavItems.map(
            (item) =>
              item.title !== 'Search' &&
              item.title !== 'Menu' && (
                <li
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <NavLink
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                    onClick={() => setMobileSidenav(false)}
                  />
                </li>
              )
          )}
          <li className="flex h-10 w-10 items-center justify-center">
            <MobileSearchButton />
          </li>
          <li className="flex h-10 w-10 items-center justify-center">
            <MobileMenuButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
