'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks';

interface AuthorizedLayoutProps {
  requiredPermission: string;
  children: React.ReactNode;
}

const AuthorizedLayout: React.FC<AuthorizedLayoutProps> = ({
  requiredPermission,
  children,
}) => {
  const { permissions } = usePermissions();
  const { push } = useRouter();

  const hasPermission = permissions.some(
    (permission) => permission.permission_name === requiredPermission
  );

  if (!hasPermission) {
    push('/');
    return null;
  }

  return children;
};

export default AuthorizedLayout;
