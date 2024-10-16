import React from 'react';

export interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  color?: string;
  isParent?: boolean;
  onClick?: () => void;
  childrens?: NavItem[];
}

export interface IStaff {
  id: string;
  username: string;
  name: string;
  email: string;
  nip: string;
  status: string;
  role: string;
  password: string;
  created_at: string;
  updated_at: string;
}
