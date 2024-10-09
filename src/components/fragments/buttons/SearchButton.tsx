"use client";

import React, { useState, useEffect } from "react";
import { CommandIcon, Search } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useHotkeys("cmd+k, ctrl+k, meta+k", () => {
    setIsOpen(true);
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isMobile ? (
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search />
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="hidden justify-between gap-x-40 rounded-xl sm:flex"
            size="lg"
          >
            <span className="text-gray-400">Search</span>
            <div className="hidden items-center gap-x-1 rounded p-1 text-xs text-gray-400 dark:bg-zinc-800 sm:flex">
              <CommandIcon size="12px" />
              <span>K</span>
            </div>
          </Button>
        )}
      </DialogTrigger>
      <DialogTitle className="hidden">Search</DialogTitle>
      <DialogContent className="rounded-xl sm:max-w-[425px]">
        <Input
          id="search"
          placeholder="Search..."
          className="absolute left-0 top-0 mt-1 w-full rounded-xl border border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </DialogContent>
    </Dialog>
  );
}
