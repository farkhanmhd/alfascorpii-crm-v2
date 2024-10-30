import React from 'react';
import { useMobileSidenav } from '@/hooks';
import NavLink from '../navigation/NavLink';
import { MobileNavItems } from '../navigation/constants';
import MobileSearchButton from '../buttons/MobileSearchButton';
import MobileMenuButton from '../buttons/MobileMenuButton';

const MobileNav = () => {
  const { setMobileSidenav } = useMobileSidenav();
  return (
    <div className="h-[80px] border-t bg-background px-12">
      <nav className="h-full">
        <ul className="flex h-full items-center justify-between">
          {MobileNavItems.map((item) => (
            <li
              key={item.title}
              className="flex h-10 w-10 items-center justify-center"
            >
              <NavLink
                title={item.title}
                href={item.href}
                icon={item.icon}
                onClick={() => setMobileSidenav(false)}
                showText={false}
              />
            </li>
          ))}
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
