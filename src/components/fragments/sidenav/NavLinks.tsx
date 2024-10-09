import React from "react";
import NavLink from "./NavLink";
import { NavItems } from "./constants";

function NavLinks() {
  return (
    <nav>
      <ul className="flex flex-col gap-y-6">
        {NavItems.map((link) => (
          <li key={link.title}>
            <NavLink
              href={link.href}
              title={link.title}
              icon={link.icon}
              isParent={link.isParent}
              children={link.children}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
