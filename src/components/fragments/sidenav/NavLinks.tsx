import React from "react";
import { LayoutDashboard, Users } from "lucide-react";
import NavLink from "./NavLink";

function NavLinks() {
  const links = [
    {
      id: 1,
      linkHref: "/",
      linkText: "Dashboard",
      icon: <LayoutDashboard />,
    },
    // {
    //   id: 2,
    //   linkHref: "/",
    //   linkText: "Master Data",
    //   icon: <Database />,
    // },
    {
      id: 3,
      linkHref: "/customers",
      linkText: "Customers",
      icon: <Users />,
    },
  ];
  return (
    <nav>
      <ul className="flex flex-col gap-y-6">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink
              linkHref={link.linkHref}
              linkText={link.linkText}
              icon={link.icon}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
