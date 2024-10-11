import React from 'react';
import NavLink from './NavLink';
import { NavItems } from './constants';

const NavLinks = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-y-4">
        {NavItems.map((link) => (
          <li key={link.title}>
            <NavLink
              href={link.href}
              title={link.title}
              icon={link.icon}
              isParent={link.isParent}
              childrens={link.childrens}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
