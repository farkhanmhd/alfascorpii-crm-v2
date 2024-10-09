import React from "react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export default function Sidenav() {
  return (
    <aside className="fixed left-0 flex h-screen flex-col justify-between px-16 py-16 font-medium text-gray-400">
      <div className="flex flex-col space-y-48">
        <Link href="/">
          <Logo />
        </Link>
        <NavLinks />
      </div>
      <button type="button">
        <div className="flex min-w-[260px] items-center gap-x-3 rounded-xl px-8 py-3 text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
          <LogOut />
          <span>Logout</span>
        </div>
      </button>
    </aside>
  );
}
