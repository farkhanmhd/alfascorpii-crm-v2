"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

interface NavLinkProps {
  linkHref: string;
  linkText: string;
  icon: React.ReactNode;
}

function NavLink({ linkHref, linkText, icon }: NavLinkProps) {
  const pathname = usePathname();
  const mainPath = pathname.split("/").filter((path) => path !== "")[0];
  const activeLink =
    pathname === "/" ? linkHref === "/" : mainPath === linkText.toLowerCase();
  return (
    <Link
      href={linkHref}
      className={clsx(
        "flex min-w-[260px] items-center gap-x-3 rounded-xl px-8 py-3 duration-300",
        {
          "bg-primary text-white hover:bg-primary/90 dark:hover:bg-primary/60":
            activeLink,
          "text-black hover:text-primary dark:text-white dark:hover:text-primary":
            activeLink === false,
        },
      )}
    >
      {icon}
      <span>{linkText}</span>
    </Link>
  );
}

export default NavLink;
