import React from "react";
import LogoIcon from "@/components/Icon/LogoIcon";

function Logo() {
  return (
    <div className="flex items-center gap-4">
      <LogoIcon />
      <span className="text-xl font-semibold text-black dark:text-white">
        Alfa Scorpii CRM
      </span>
    </div>
  );
}

export default Logo;
