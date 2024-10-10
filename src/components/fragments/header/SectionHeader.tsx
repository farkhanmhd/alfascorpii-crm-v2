import React from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import ThemeToggle from "../toggle/ThemeToggle";
import SearchButton from "../buttons/SearchButton";

const SectionHeader = () => {
  return (
    <header className="flex items-center justify-between pr-16">
      <Breadcrumbs />
      <div>
        <div className="flex space-x-4">
          <SearchButton />
          <ThemeToggle />
          <Button variant="ghost" className="rounded-full" size="icon">
            <User />
          </Button>
          <div>
            <h4 className="text-sm font-semibold">Farkhan Muhammad</h4>
            <span className="text-xs text-gray-400">IT Staff</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SectionHeader;
