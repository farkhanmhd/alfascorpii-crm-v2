'use client';

import React from 'react';
import { useSidebarDesktop } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const SidebarMenuButton: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarDesktop();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <X /> : <Menu />}
    </Button>
  );
};

export default SidebarMenuButton;
